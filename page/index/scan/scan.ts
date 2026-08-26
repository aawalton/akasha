import { pageNameOf } from "../../name/name.ts"
import { git } from "../../../repo/git/git.ts"
import { builtFrom, loadPages } from "../store/store.ts"

const SUFFIXED = /\*\.[a-z0-9-]+\.md$/

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
  const matching = patterns.map((one) => new Bun.Glob(one))
  const found = new Set<string>()
  for (const one of loadPages()) {
    if (one.repo !== repo) continue
    if (matching.some((each) => each.match(one.key))) found.add(one.key)
  }
  return [...found].sort()
}
