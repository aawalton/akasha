import { createHash } from "node:crypto"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"

const BREAK = "\n"

const DIGEST = "sha256"

const HEX = "hex"

export type Reading = (path: string) => string | null

export type Chained = { readonly position: number; readonly outcomes: string | null }

export function linesIn(read: Reading, outcomes: string | null): readonly string[] {
  const kept = outcomes === null ? null : read(outcomes)
  if (kept === null) return []
  return kept.split(BREAK).filter((one) => one.trim() !== "")
}

export function lineBefore(read: Reading, turns: readonly Chained[]): string | null {
  for (const one of turns.toSorted((a, b) => b.position - a.position)) {
    const line = linesIn(read, one.outcomes).at(-1)
    if (line !== undefined) return line
  }
  return null
}

export function seedAfter(
  before: string | null,
  turn: string,
  place: number,
  unmade: number
): string {
  if (before === null && unmade === 0) return turn
  const parts = [before ?? "", turn, String(place)]
  if (unmade > 0) parts.push(String(unmade))
  return createHash(DIGEST).update(parts.join(BREAK)).digest(HEX)
}

export function unmadeLogged(root: string, paths: readonly string[]): number {
  const said = told(root, ["log", "--diff-filter=D", "--format=%H", "--", ...paths])
  return said === null ? 0 : said.split(BREAK).filter((one) => one.trim() !== "").length
}
