import type { Change } from "@akasha/pages/change"
import { shadowFor } from "@akasha/pages/shadow"

export type Gone = {
  readonly path: string
  readonly body: Uint8Array | null
}

export type Carry = {
  readonly from: string
  readonly to: string
}

export type Orphaning = {
  readonly path: string
  readonly importers: readonly string[]
}

const NAMED = 3

export const TOGETHER = "the importers have to change in the same landing"

export function absentAfter(edits: readonly Gone[], carries: readonly Carry[]): readonly string[] {
  const gone = new Set<string>()
  for (const one of edits) if (one.body === null) gone.add(one.path)
  for (const one of carries) gone.add(one.from)
  for (const one of edits) if (one.body !== null) gone.delete(one.path)
  for (const one of carries) gone.delete(one.to)
  return [...gone].sort()
}

export function orphaningIn(change: Change, absent: readonly string[]): readonly Orphaning[] {
  if (absent.length === 0) return []
  const cast = shadowFor(change)
  if ("refused" in cast) return []
  const held: Orphaning[] = []
  for (const path of absent) {
    const importers = cast.shadow.index.importersOf(path)
    if (importers.length > 0) held.push({ path, importers })
  }
  return held
}

export function orphaningSaid(one: Orphaning): string {
  const named = one.importers.slice(0, NAMED)
  const rest = one.importers.length - named.length
  const said = rest > 0 ? `${named.join(", ")} and ${rest} more` : named.join(", ")
  return `${one.path} — still imported by ${said} as this change leaves the tree, so taking it away leaves them reaching nothing; ${TOGETHER}`
}
