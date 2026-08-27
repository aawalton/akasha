import { globSync } from "node:fs"
import { Minimatch } from "minimatch"

/**
 * Matching a path against a glob, and listing what a glob names under a root.
 *
 * `minimatch` AND `node:fs` RATHER THAN `Bun.Glob`, because every page read reaches here and this
 * file is loaded in the editor's extension host, which is node and has no `Bun` global. Both were
 * measured against `Bun.Glob` over this repository's own patterns and roots and answer the same.
 *
 * MATCHING TAKES `dot: true` AND SCANNING DOES NOT. The asymmetry is `Bun.Glob`'s own, and it is
 * load-bearing: `.match` counts a leading dot as an ordinary character, so a `.claude` path a
 * caller asks about answers true, while `.scanSync` walks past hidden directories. Holding both to
 * one setting either loses every dotted path a caller names or walks `.git` on every scan.
 */
const MATCHING = { dot: true } as const

const held = new Map<string, Minimatch>()

/**
 * The compiled matcher for a pattern, made once.
 *
 * `claiming` asks the same handful of globs about every page in the repository, and compiling the
 * glob is the expensive half of matching against one.
 */
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

/**
 * Every path under `root` that `pattern` names, relative to it.
 *
 * A ROOT THAT IS NOT THERE RAISES ENOENT rather than answering nothing, which is what `Bun.Glob`
 * did and what the callers are written against: an empty answer reads exactly like a repository
 * with no page in it, and every check over it would pass.
 */
export function scanGlob(pattern: string, root: string): readonly string[] {
  return globSync(pattern, { cwd: root })
}
