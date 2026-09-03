import { resolve } from "node:path"
import { Glob } from "bun"
import { CHECK_EXEMPT_DIRS } from "../repo-scope/repo-scope.module.code.ts"

export const FILESYSTEM_WALK_EXEMPT_DIRS: ReadonlySet<string> = new Set([
  "node_modules",
  ".git",
  "dist",
  ".next",
  ".turbo",
  ".cache",
  "build",
  "coverage",
  ...CHECK_EXEMPT_DIRS,
])

export interface FindFilesOptions {
  cwd: string
  patterns: readonly string[]
  exclude?: ReadonlySet<string>
  absolute?: boolean
  dot?: boolean
}

export function findFiles(options: FindFilesOptions): readonly string[] {
  const cwd = options.cwd
  const exclude = options.exclude ?? FILESYSTEM_WALK_EXEMPT_DIRS
  const absolute = options.absolute ?? true
  const dot = options.dot ?? false

  const seen = new Set<string>()
  for (const pattern of options.patterns) {
    const glob = new Glob(pattern)
    for (const rel of glob.scanSync({ cwd, onlyFiles: true, dot })) {
      const parts = rel.split("/")
      if (parts.some((p) => exclude.has(p))) continue
      seen.add(rel)
    }
  }
  const rels = [...seen].sort()
  return absolute ? rels.map((r) => resolve(cwd, r)) : rels
}
