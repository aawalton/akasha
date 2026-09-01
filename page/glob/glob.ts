import { type Dirent, readdirSync } from "node:fs"
import { Minimatch } from "minimatch"

const MATCHING = { dot: true } as const

const held = new Map<string, Minimatch>()

// `node_modules/akasha` is a symlink to the checkout root and the workspace links beside it point
// back into the tree, so a walk that follows them recurses until it dies with ELOOP — measured at
// 78s to the throw. `.git` holds no page. Entries are read with their type, so a symlink is neither
// a directory to descend nor a file to match, and nothing here follows one.
const UNWALKED: ReadonlySet<string> = new Set(["node_modules", ".git"])

// Everything before the last `/` that stands ahead of the first glob character. Walking from there
// rather than from the root is what keeps a placed pattern cheap.
const SPECIAL = /[*?[\]{}()!+@]/

export function globFor(pattern: string): Minimatch {
  const found = held.get(pattern)
  if (found !== undefined) return found
  const made = new Minimatch(pattern, MATCHING)
  held.set(pattern, made)
  return made
}

export function matchesGlob(relPath: string, pattern: string): boolean {
  return globFor(pattern).match(relPath)
}

export function globBaseOf(pattern: string): string {
  const found = SPECIAL.exec(pattern)
  const cut = pattern.lastIndexOf("/", found === null ? pattern.length : found.index)
  return cut < 0 ? "" : pattern.slice(0, cut)
}

export function scanGlob(pattern: string, root: string): readonly string[] {
  const matches = globFor(pattern)
  const found: string[] = []
  const walk = (dir: string): void => {
    let entries: readonly Dirent[]
    try {
      entries = readdirSync(dir === "" ? root : `${root}/${dir}`, { withFileTypes: true })
    } catch {
      return
    }
    for (const one of entries) {
      const at = dir === "" ? one.name : `${dir}/${one.name}`
      if (one.isDirectory()) {
        if (!UNWALKED.has(one.name)) walk(at)
        continue
      }
      if (one.isFile() && matches.match(at)) found.push(at)
    }
  }
  walk(globBaseOf(pattern))
  return found
}
