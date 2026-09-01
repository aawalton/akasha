import { readFileSync } from "node:fs"
import { join } from "node:path"
import { CHECK_EXEMPT_DIRS } from "../../../../repo/scope/scope.ts"
import { discoverRepoFiles } from "./repo-files.ts"

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
