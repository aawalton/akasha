import {
  markedIn,
  placeOf,
  tableOf,
  unreadFor,
  type World,
} from "akasha/check/code/pages/hash-indexed-entry-keeps-its-place/hash-indexed-entry-keeps-its-place.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

export function hashIndexedEntryKeepsItsPlace(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const world: World = {
    read: commit.read,
    rowsOf: (kind) => commit.index.everyOfType(kind).map((one) => one.path),
  }
  const said: Judged[] = []
  for (const one of markedIn(commit.index)) {
    const found = tableOf(one, world)
    if ("unread" in found) said.push({ path: placeOf(one), reason: unreadFor(one, found.unread) })
  }
  return said
}
