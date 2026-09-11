import type { Judged } from "akasha/checks/modules/judging/judging.module.code.ts"

const HELD = ".jsonl"

const UNCOMMITTED = ".uncommitted."

const PARTED_BY = "/"

const DOT = "."

const AT_PATH = `path${PARTED_BY}`

const MISSING = "is named by a page and missing from the index"

const DIFFERS = "is in the index differing from what its page says"

const ORPHANED = "is in the index and named by no page"

export type Drifted = {
  readonly added: readonly string[]
  readonly changed: readonly string[]
  readonly went: readonly string[]
}

export function stemOf(entry: string): string {
  return entry.endsWith(HELD) ? entry.slice(0, -HELD.length) : entry
}

export function namesOneFile(entry: string): boolean {
  const stem = stemOf(entry)
  return stem.slice(stem.lastIndexOf(PARTED_BY) + 1).includes(DOT)
}

export function judgedEntry(entry: string): boolean {
  return namesOneFile(entry) && !entry.includes(UNCOMMITTED)
}

export function fileIn(entry: string): string {
  const stem = stemOf(entry)
  const cut = stem.indexOf(PARTED_BY)
  const held = cut < 0 ? stem : stem.slice(cut + 1)
  return held.startsWith(AT_PATH) ? held.slice(AT_PATH.length) : held
}

export function judgedIn(drift: Drifted): readonly Judged[] {
  const over: readonly (readonly [readonly string[], string])[] = [
    [drift.added, MISSING],
    [drift.changed, DIFFERS],
    [drift.went, ORPHANED],
  ]
  const said: Judged[] = []
  for (const [every, how] of over) {
    for (const entry of every) {
      if (!judgedEntry(entry)) continue
      said.push({ path: fileIn(entry), reason: `the index entry for this file ${how}` })
    }
  }
  return said
}
