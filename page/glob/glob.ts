import { globSync } from "node:fs"
import { Minimatch } from "minimatch"

const MATCHING = { dot: true } as const

const held = new Map<string, Minimatch>()

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

export function scanGlob(pattern: string, root: string): readonly string[] {
  return globSync(pattern, { cwd: root })
}
