import { type Dirent, readdirSync } from "node:fs"
import { relative, resolve } from "node:path"

export interface WalkDirEntry {
  readonly name: string
  readonly isFile: () => boolean
  readonly isDirectory: () => boolean
}

export interface WalkedFile {
  readonly absPath: string
  readonly name: string
}

export interface WalkPackageTreeOptions {
  readonly packageRoot: string
  readonly repoRoot: string
  readonly otherWorkspaceRoots: ReadonlySet<string>
  readonly skipDirNames: ReadonlySet<string>
  readonly onFile: (file: WalkedFile) => undefined | "stop"
  readonly readDir?: (dir: string) => readonly WalkDirEntry[]
}

const defaultReadDir = (dir: string): readonly Dirent[] => {
  try {
    return readdirSync(dir, { withFileTypes: true })
  } catch {
    return []
  }
}

export function walkPackageTree(opts: WalkPackageTreeOptions): undefined {
  const { packageRoot, repoRoot, otherWorkspaceRoots, skipDirNames, onFile } = opts
  const readDir = opts.readDir ?? defaultReadDir
  let stopped = false

  function walk(dir: string, depth: number): undefined {
    if (stopped) return
    if (depth > 0) {
      const relToRepo = relative(repoRoot, dir)
      if (otherWorkspaceRoots.has(relToRepo)) return
    }
    for (const entry of readDir(dir)) {
      if (stopped) return
      if (skipDirNames.has(entry.name)) continue
      const abs = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        walk(abs, depth + 1)
      } else if (entry.isFile()) {
        if (onFile({ absPath: abs, name: entry.name }) === "stop") {
          stopped = true
          return
        }
      }
    }
  }

  walk(packageRoot, 0)
}
