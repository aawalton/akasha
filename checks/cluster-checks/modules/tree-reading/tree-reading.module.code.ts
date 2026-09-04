import { execFileSync } from "node:child_process"
import { readFileSync } from "node:fs"
import { join } from "node:path"
import { discoverRepoFiles } from "../repo-files/repo-files.module.code.ts"
import { CHECK_EXEMPT_DIRS } from "../repo-scope/repo-scope.module.code.ts"

export type TreeReadingOptions = {
  readonly includeFixtures?: boolean
  readonly includeGenerated?: boolean
}

export type TreeReading = {
  readonly root: string
  readonly paths: readonly string[]
  readonly files: (options?: TreeReadingOptions) => readonly string[]
  readonly hasFile: (relPath: string) => boolean
  readonly hasDir: (relPath: string) => boolean
  readonly hasPath: (relPath: string) => boolean
  readonly read: (relPath: string) => string | null
}

export function readingOver(
  root: string,
  paths: readonly string[],
  read: (relPath: string) => string | null
): TreeReading {
  const files = new Set(paths)
  const dirs = new Set<string>()
  for (const path of paths) {
    let slash = path.lastIndexOf("/")
    while (slash > 0) {
      const dir = path.slice(0, slash)
      if (dirs.has(dir)) break
      dirs.add(dir)
      slash = dir.lastIndexOf("/")
    }
  }
  const hasFile = (relPath: string): boolean => files.has(relPath)
  const hasDir = (relPath: string): boolean => relPath === "" || dirs.has(relPath)
  const narrowed = (options?: TreeReadingOptions): readonly string[] => {
    const includeFixtures = options?.includeFixtures ?? false
    const includeGenerated = options?.includeGenerated ?? false
    if (includeFixtures && includeGenerated) return paths
    const isExempt = (rel: string): boolean => {
      for (const segment of rel.split("/")) {
        if (!CHECK_EXEMPT_DIRS.has(segment)) continue
        if (segment === "__fixtures__" && !includeFixtures) return true
        if (segment === "generated" && !includeGenerated) return true
      }
      return false
    }
    return paths.filter((rel) => !isExempt(rel))
  }
  return {
    root,
    paths,
    files: narrowed,
    hasFile,
    hasDir,
    hasPath: (relPath) => hasFile(relPath) || hasDir(relPath),
    read,
  }
}

const GIT_OUTPUT_CEILING = 512 * 1024 * 1024

const LF = 10

const MISSING = " missing"

const READING_BODIES = "reading the files at a tree"

const UNPREFETCHED: ReadonlySet<string> = new Set([".jsonl", ".md", ".txt"])

const endingOf = (path: string): string => {
  const name = path.slice(path.lastIndexOf("/") + 1)
  const at = name.lastIndexOf(".")
  return at <= 0 ? "" : name.slice(at)
}

const runGitBytes = (
  root: string,
  args: readonly string[],
  reason: string,
  input?: Buffer
): Buffer => {
  try {
    return execFileSync("git", ["-C", root, ...args], {
      input,
      maxBuffer: GIT_OUTPUT_CEILING,
      stdio: [input === undefined ? "ignore" : "pipe", "pipe", "pipe"],
    })
  } catch (err) {
    const detail =
      typeof err === "object" && err !== null && "stderr" in err
        ? String(err.stderr ?? "").trim()
        : String(err)
    throw new Error(`${reason} in ${root} failed: ${detail}`)
  }
}

const bodiesAtTree = (
  root: string,
  tree: string,
  paths: readonly string[]
): Map<string, Buffer> => {
  const bodies = new Map<string, Buffer>()
  if (paths.length === 0) return bodies
  const out = runGitBytes(
    root,
    ["cat-file", "--batch", "-z"],
    READING_BODIES,
    Buffer.from(paths.map((path) => `${tree}:${path}\0`).join(""), "utf-8")
  )
  let at = 0
  for (const path of paths) {
    const stop = out.indexOf(LF, at)
    if (stop < 0) {
      throw new Error(`${READING_BODIES} in ${root} stopped before it answered for ${path}`)
    }
    const header = out.toString("utf-8", at, stop)
    at = stop + 1
    if (header.endsWith(MISSING)) continue
    const size = Number(header.slice(header.lastIndexOf(" ") + 1))
    if (!Number.isSafeInteger(size) || size < 0) {
      throw new Error(
        `${READING_BODIES} in ${root} answered \`${header}\` for ${path}, which names no size`
      )
    }
    bodies.set(path, out.subarray(at, at + size))
    at += size + 1
  }
  if (at !== out.length) {
    throw new Error(
      `${READING_BODIES} in ${root} answered ${out.length} bytes and ${at} were accounted for`
    )
  }
  return bodies
}

export function treeReadingAt(root: string, tree: string): TreeReading {
  const listed = runGitBytes(
    root,
    ["ls-tree", "-r", "-z", "--name-only", tree],
    "listing the files at a tree"
  )
    .toString("utf-8")
    .split("\0")
    .filter((rel) => rel !== "")
  listed.sort()
  const standing = new Set(listed)

  let bodies: Map<string, Buffer> | null = null
  const read = (relPath: string): string | null => {
    bodies ??= bodiesAtTree(
      root,
      tree,
      listed.filter((path) => !UNPREFETCHED.has(endingOf(path)))
    )
    const held = bodies.get(relPath)
    if (held !== undefined) return held.toString("utf-8")
    if (!standing.has(relPath)) return null
    const single = bodiesAtTree(root, tree, [relPath]).get(relPath)
    if (single === undefined) return null
    bodies.set(relPath, single)
    return single.toString("utf-8")
  }
  return readingOver(root, listed, read)
}

export function worktreeReading(root: string): TreeReading {
  const paths = discoverRepoFiles(root, { includeFixtures: true, includeGenerated: true })
  const held = new Map<string, string | null>()
  const read = (relPath: string): string | null => {
    const standing = held.get(relPath)
    if (standing !== undefined) return standing
    let body: string | null
    try {
      body = readFileSync(join(root, relPath), "utf-8")
    } catch {
      body = null
    }
    held.set(relPath, body)
    return body
  }
  return readingOver(root, paths, read)
}
