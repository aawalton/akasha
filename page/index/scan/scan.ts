import { pageNameOf } from "../../name/name.ts"
import { git } from "../../../repo/git/git.ts"
import { builtFrom, loadPages } from "../store/store.ts"

const SUFFIXED = /\*\.[a-z0-9-]+\.md$/

const globs = new Map<string, Bun.Glob>()

function globAt(pattern: string): Bun.Glob {
  const held = globs.get(pattern)
  if (held !== undefined) return held
  const made = new Bun.Glob(pattern)
  globs.set(pattern, made)
  return made
}

let byRepo: ReadonlyMap<string, readonly string[]> | null = null

function keysOf(repo: string): readonly string[] {
  if (byRepo === null) {
    const made = new Map<string, string[]>()
    for (const one of loadPages()) {
      const held = made.get(one.repo)
      if (held === undefined) made.set(one.repo, [one.key])
      else held.push(one.key)
    }
    byRepo = made
  }
  return byRepo.get(repo) ?? []
}

const answering = new Map<string, boolean>()

function pageFileDiffers(root: string): boolean {
  const said = git(root, ["status", "--porcelain", "-z"])
  if (said.code !== 0) return true
  for (const entry of said.stdout.split("\0")) {
    if (entry.length < 4) continue
    if (pageNameOf(entry.slice(3)) !== null) return true
  }
  return false
}

export function indexAnswersFor(repo: string, root: string): boolean {
  const held = answering.get(root)
  if (held !== undefined) return held
  const marks = builtFrom()
  const made = marks !== null && marks[repo] !== undefined && !pageFileDiffers(root)
  answering.set(root, made)
  return made
}

export function scannedFromIndex(
  root: string,
  patterns: readonly string[],
  repo: string | null
): readonly string[] | null {
  if (repo === null || patterns.length === 0) return null
  if (!patterns.every((one) => SUFFIXED.test(one))) return null
  if (!indexAnswersFor(repo, root)) return null
  const matching = patterns.map(globAt)
  return [...new Set(keysOf(repo).filter((key) => matching.some((one) => one.match(key))))].sort()
}
