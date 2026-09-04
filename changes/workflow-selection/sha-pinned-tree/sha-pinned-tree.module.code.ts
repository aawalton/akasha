import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readlinkSync,
  realpathSync,
  symlinkSync,
} from "node:fs"
import { readdir, rm } from "node:fs/promises"
import { dirname, join, resolve } from "node:path"
import type { CommitSha40 } from "@akasha/workflow-language/ci-identifiers"

const ARCHIVE_CEILING_MS = 30_000

const TAR_CEILING_MS = 30_000

const MODULES = "node_modules"

const PACKAGE_JSON = "package.json"

const SHORT = 7

export const CREATOR_SCRATCH_ROOT = "/var/tmp/sha-pinned-trees"

export interface ShaPinnedTreeArgs {
  readonly gitDir: string
  readonly sha: CommitSha40
  readonly scratchRoot?: string
  readonly onExtractComplete?: (extractMs: number) => void
}

function defaultScratchRoot(gitDir: string): string {
  return join(dirname(gitDir), "orchestrator-pipeline-load")
}

function randomSuffix(): string {
  return Math.random().toString(36).slice(2, 10)
}

async function waitFor(proc: Bun.Subprocess, label: string, ceilingMs: number): Promise<number> {
  let timer: ReturnType<typeof setTimeout> | undefined
  const ceiling = new Promise<never>((_resolve, reject) => {
    timer = setTimeout(() => {
      proc.kill()
      reject(new Error(`${label} did not finish inside ${ceilingMs}ms`))
    }, ceilingMs)
  })
  try {
    return await Promise.race([proc.exited, ceiling])
  } finally {
    if (timer !== undefined) clearTimeout(timer)
  }
}

async function extractInto(gitDir: string, sha: string, into: string): Promise<void> {
  const archive = Bun.spawn(["git", "-C", gitDir, "archive", "--format=tar", sha], {
    stdout: "pipe",
    stderr: "pipe",
  })
  const untar = Bun.spawn(["tar", "-x", "-C", into], {
    stdin: archive.stdout,
    stdout: "pipe",
    stderr: "pipe",
  })
  let archived: number
  let untarred: number
  try {
    ;[archived, untarred] = await Promise.all([
      waitFor(archive, `git archive ${sha.slice(0, SHORT)} at ${gitDir}`, ARCHIVE_CEILING_MS),
      waitFor(untar, `tar -x into ${into}`, TAR_CEILING_MS),
    ])
  } catch (err) {
    await rm(into, { recursive: true, force: true })
    throw err
  }
  if (archived === 0 && untarred === 0) return
  const said = await new Response(archive.stderr).text()
  const alsoSaid = await new Response(untar.stderr).text()
  await rm(into, { recursive: true, force: true })
  throw new Error(
    `git archive ${sha.slice(0, SHORT)} | tar -x into ${into} failed ` +
      `(archive ${archived}, tar ${untarred}): ${said.trim()} ${alsoSaid.trim()}`
  )
}

export async function workspacesDeclaredIn(pinned: string): Promise<ReadonlyMap<string, string>> {
  const root: unknown = await Bun.file(join(pinned, PACKAGE_JSON)).json()
  const held = typeof root === "object" && root !== null ? (root as { workspaces?: unknown }) : {}
  const patterns = Array.isArray(held.workspaces)
    ? held.workspaces.filter((one): one is string => typeof one === "string")
    : []
  const found = new Map<string, string>()
  for (const pattern of patterns) {
    for (const rel of new Bun.Glob(`${pattern}/${PACKAGE_JSON}`).scanSync({
      cwd: pinned,
      onlyFiles: true,
    })) {
      const declared: unknown = await Bun.file(join(pinned, rel)).json()
      const named =
        typeof declared === "object" && declared !== null
          ? (declared as { name?: unknown }).name
          : undefined
      if (typeof named === "string" && named !== "") found.set(named, dirname(rel))
    }
  }
  return found
}

function pointsInto(link: string, at: string, root: string): boolean {
  if (lstatSync(link, { throwIfNoEntry: false })?.isSymbolicLink() !== true) return false
  return resolve(at, readlinkSync(link)).startsWith(`${root}/`)
}

export function linkModulesInto(
  pinned: string,
  hostRoot: string,
  workspaces: ReadonlyMap<string, string>
): number {
  const hostModules = join(hostRoot, MODULES)
  const pinnedModules = join(pinned, MODULES)
  mkdirSync(pinnedModules, { recursive: true })

  const scoped = new Set<string>()
  for (const named of workspaces.keys()) {
    if (named.startsWith("@")) scoped.add(named.slice(0, named.indexOf("/")))
  }

  if (existsSync(hostModules)) {
    for (const entry of readdirSync(hostModules)) {
      const from = join(hostModules, entry)
      const to = join(pinnedModules, entry)
      if (!scoped.has(entry)) {
        symlinkSync(from, to)
        continue
      }
      mkdirSync(to, { recursive: true })
      for (const inner of readdirSync(from)) {
        const innerFrom = join(from, inner)
        if (workspaces.has(`${entry}/${inner}`)) continue
        if (pointsInto(innerFrom, from, hostRoot)) continue
        symlinkSync(innerFrom, join(to, inner))
      }
    }
  }

  let linked = 0
  for (const [named, dir] of workspaces) {
    const to = join(pinnedModules, named)
    mkdirSync(dirname(to), { recursive: true })
    if (lstatSync(to, { throwIfNoEntry: false }) !== undefined) continue
    symlinkSync(join(pinned, dir), to)
    linked++
  }
  return linked
}

export async function withShaPinnedTree<T>(
  args: ShaPinnedTreeArgs,
  fn: (extractPath: string) => Promise<T>
): Promise<T> {
  const scratchRoot = args.scratchRoot ?? defaultScratchRoot(args.gitDir)
  const madeAt = join(scratchRoot, `${args.sha.slice(0, SHORT)}-${randomSuffix()}`)
  const started = performance.now()

  mkdirSync(madeAt, { recursive: true })
  const pinned = realpathSync(madeAt)

  await extractInto(args.gitDir, args.sha, pinned)

  try {
    const workspaces = await workspacesDeclaredIn(pinned)
    if (workspaces.size === 0) {
      throw new Error(
        `the tree at ${args.sha.slice(0, SHORT)} declares no workspace, so every workspace import ` +
          `in it would resolve against ${args.gitDir} instead — refusing to read one commit's ` +
          "workflows out of another commit's source"
      )
    }
    linkModulesInto(pinned, args.gitDir, workspaces)
    args.onExtractComplete?.(performance.now() - started)
    return await fn(pinned)
  } finally {
    await rm(pinned, { recursive: true, force: true })
  }
}

export async function sweepShaPinnedTreeState(gitDir: string, scratchRoot?: string): Promise<void> {
  const root = scratchRoot ?? defaultScratchRoot(gitDir)
  if (!existsSync(root)) return
  let entries: string[]
  try {
    entries = await readdir(root)
  } catch {
    return
  }
  for (const name of entries) await rm(join(root, name), { recursive: true, force: true })
}
