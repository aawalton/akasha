import {
  blobIdOf,
  type Carry,
  carryReadings,
  dropReadings,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Running } from "akasha/command/modules/change-kind-running/change-kind-running.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"

export function carryLanded(
  root: string,
  base: string,
  running: Running,
  changes: readonly FileChange[],
  handed: readonly Carry[],
  owed: ReadonlyMap<string, boolean>
): undefined {
  const held: Carry[] = running.readersOweReading ? [] : [...handed]
  const dropped: string[] = []
  for (const one of changes) {
    if (one.kind === "move") continue
    if (owed.get(one.path) ?? running.readersOweReading) {
      dropped.push(one.path)
      continue
    }
    if (one.kind === "remove") continue
    const was = bodyAt(root, base, one.path)
    if (was === null) continue
    held.push({ was: one.path, now: one.path, from: blobIdOf(was) })
  }
  carryReadings(root, held)
  dropReadings(root, dropped)
}
