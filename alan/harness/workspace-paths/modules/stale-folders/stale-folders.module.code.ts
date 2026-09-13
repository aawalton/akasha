import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative } from "node:path"
import { z } from "zod"

const PKG_JSON_PARTIAL_SCHEMA = z.object({ workspaces: z.unknown().optional() }).passthrough()

const SKIPPED_DIR_NAMES = new Set([".git", "node_modules"])

export interface OrphanFolder {
  relativePath: string
  absolutePath: string
  sizeBytes: number
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
