import { execFileSync } from "node:child_process"
import { existsSync, readdirSync, readFileSync, rmSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"
import { z } from "zod"

const PKG_JSON_PARTIAL_SCHEMA = z.object({ workspaces: z.unknown().optional() }).passthrough()

const PREFIX = "[stale-folders]"
const SKIPPED_DIR_NAMES = new Set([".git", "node_modules"])

export interface CliArgs {
  repoRoot: string
  execute: boolean
  json: boolean
}

export interface OrphanFolder {
  relativePath: string
  absolutePath: string
  sizeBytes: number
}

function parseArgs(argv: readonly string[]): CliArgs {
  let repoRoot = codeRoot()
  let execute = false
  let json = false
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === "--execute") execute = true
    else if (a === "--json") json = true
    else if (a === "--repo-root") {
      const v = argv[i + 1]
      if (v == null) {
        console.error(`${PREFIX} --repo-root requires a value`)
        process.exit(2)
      }
      repoRoot = resolve(v)
      i++
    } else {
      console.error(`${PREFIX} unknown argument: ${a}`)
      console.error(
        `${PREFIX} usage: akasha stale-folders [--execute] [--json] [--repo-root <dir>]`
      )
      process.exit(2)
    }
  }
  return { repoRoot, execute, json }
}

export function computeKnownDirsFromGit(repoRoot: string): Set<string> {
  const stdout = execFileSync(
    "git",
    ["-C", repoRoot, "ls-files", "--cached", "--others", "--exclude-standard"],
    { encoding: "utf8", maxBuffer: 256 * 1024 * 1024 }
  )
  return knownDirsFromFileList(stdout.split("\n"))
}

export function knownDirsFromFileList(lines: Iterable<string>): Set<string> {
  const dirs = new Set<string>()
  dirs.add("")
  for (const raw of lines) {
    const line = raw.trim()
    if (line === "") continue
    const parts = line.split("/")
    for (let i = 0; i < parts.length - 1; i++) {
      dirs.add(parts.slice(0, i + 1).join("/"))
    }
  }
  return dirs
}

export function discoverStaleFolders(
  repoRoot: string,
  knownDirs: Set<string>
): readonly OrphanFolder[] {
  const orphans: OrphanFolder[] = [...walk(repoRoot, repoRoot, knownDirs)]
  orphans.sort((a, b) => a.relativePath.localeCompare(b.relativePath))
  return orphans
}

function walk(dir: string, repoRoot: string, knownDirs: Set<string>): readonly OrphanFolder[] {
  const name = dir === repoRoot ? "" : (dir.split("/").pop() ?? "")
  if (SKIPPED_DIR_NAMES.has(name)) return []

  const pkgJsonPath = join(dir, "package.json")
  if (existsSync(pkgJsonPath)) {
    const pkg = readPackageJson(pkgJsonPath)
    if (pkg && !pkg.workspaces) return []
  }

  const relDir = dir === repoRoot ? "" : toPosix(relative(repoRoot, dir))
  if (!knownDirs.has(relDir)) {
    return [
      {
        relativePath: relDir,
        absolutePath: dir,
        sizeBytes: directorySize(dir),
      },
    ]
  }

  let entries: { name: string; isDir: boolean }[]
  try {
    entries = readdirSync(dir, { withFileTypes: true }).map((e) => ({
      name: e.name,
      isDir: e.isDirectory(),
    }))
  } catch {
    return []
  }

  const collected: OrphanFolder[] = []
  for (const entry of entries) {
    if (!entry.isDir) continue
    collected.push(...walk(join(dir, entry.name), repoRoot, knownDirs))
  }
  return collected
}

function readPackageJson(path: string): { workspaces?: unknown } | null {
  try {
    const parsed = PKG_JSON_PARTIAL_SCHEMA.parse(JSON.parse(readFileSync(path, "utf8")))
    return { workspaces: parsed.workspaces }
  } catch {
    return null
  }
}

function directorySize(dir: string): number {
  let total = 0
  const stack = [dir]
  while (stack.length > 0) {
    const current = stack.pop()
    if (current === undefined) break
    let entries: { name: string; isDir: boolean; isFile: boolean }[]
    try {
      entries = readdirSync(current, { withFileTypes: true }).map((e) => ({
        name: e.name,
        isDir: e.isDirectory(),
        isFile: e.isFile(),
      }))
    } catch {
      continue
    }
    for (const entry of entries) {
      const full = join(current, entry.name)
      if (entry.isDir) {
        stack.push(full)
        continue
      }
      if (!entry.isFile) continue
      try {
        total += statSync(full).size
      } catch {}
    }
  }
  return total
}

function toPosix(p: string): string {
  return p.split("\\").join("/")
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n}B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)}K`
  if (n < 1024 * 1024 * 1024) return `${(n / (1024 * 1024)).toFixed(1)}M`
  return `${(n / (1024 * 1024 * 1024)).toFixed(2)}G`
}

function main(): undefined {
  const { repoRoot, execute, json } = parseArgs(process.argv.slice(2))
  if (!existsSync(repoRoot)) {
    console.error(`${PREFIX} --repo-root ${repoRoot} does not exist`)
    process.exit(2)
  }

  const knownDirs = computeKnownDirsFromGit(repoRoot)
  const orphans = discoverStaleFolders(repoRoot, knownDirs)

  if (json) {
    for (const o of orphans) {
      console.log(JSON.stringify({ path: o.relativePath, bytes: o.sizeBytes }))
    }
    if (execute) {
      const failures = removeAll(orphans)
      process.exit(failures > 0 ? 1 : 0)
    }
    process.exit(0)
  }

  const mode = execute ? "EXECUTE" : "DRY-RUN"
  console.log(`${PREFIX} mode=${mode} repo=${repoRoot}`)
  if (orphans.length === 0) {
    console.log(`${PREFIX} no stale folders found`)
    process.exit(0)
  }

  const total = orphans.reduce((n, o) => n + o.sizeBytes, 0)
  const verb = execute ? "removing" : "would remove"
  for (const o of orphans) {
    console.log(`${PREFIX} ${verb}: ${o.relativePath} (${formatBytes(o.sizeBytes)})`)
  }
  console.log(
    `${PREFIX} ${execute ? "removed" : "would remove"} ${orphans.length} folder(s), ${formatBytes(total)} total`
  )

  if (!execute) {
    console.log(`${PREFIX} pass --execute to delete them`)
    process.exit(0)
  }

  const failures = removeAll(orphans)
  process.exit(failures > 0 ? 1 : 0)
}

function removeAll(orphans: readonly OrphanFolder[]): number {
  let failures = 0
  for (const o of orphans) {
    try {
      rmSync(o.absolutePath, { recursive: true, force: true })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      console.error(`${PREFIX} failed to remove ${o.relativePath}: ${message}`)
      failures++
    }
  }
  return failures
}

if (import.meta.main) {
  main()
}
