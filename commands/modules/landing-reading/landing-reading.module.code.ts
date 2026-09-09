import type { FileChange } from "@akasha/changes/change-answer/types"
import type { Given } from "../calling/calling.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import type { Running } from "../drafting/drafting.module.code.ts"
import {
  blobIdOf,
  type Carry,
  carryReadings,
  dropReadings,
  type Reading,
  readingIn,
  recordRead,
} from "../reading/reading.module.code.ts"

const BYTES = new TextEncoder()

export function recordLanded(given: Given, changes: readonly FileChange[]): undefined {
  if (given.agentId === null) return
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "remove") continue
    recordRead(given.root, given.agentId, {
      path: one.path,
      oid: blobIdOf(BYTES.encode(one.kind === "add" ? one.content : one.contentTo)),
      seenAt: Date.now(),
      carriedOid: null,
    })
  }
}

export const NO_OWING: ReadonlyMap<string, boolean> = new Map()

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

export function asReadIn(given: Given, changes: readonly FileChange[]): readonly Reading[] {
  if (given.agentId === null) return []
  const held: Reading[] = []
  for (const one of changes) {
    if (one.kind === "move") continue
    const seen = readingIn(given.root, given.agentId, one.path)
    if (seen !== null) held.push(seen)
  }
  return held
}
