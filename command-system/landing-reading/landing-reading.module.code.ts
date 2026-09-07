import type { Given } from "../calling/calling.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import type { Running } from "../drafting/drafting.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
import {
  blobIdOf,
  type Carry,
  carryReadings,
  dropReadings,
  type Reading,
  readingIn,
  recordRead,
} from "../reading/reading.module.code.ts"

export function recordLanded(given: Given, changes: readonly FileEdit[]): undefined {
  if (given.agentId === null) return
  for (const one of changes) {
    if (one.body === null) continue
    recordRead(given.root, given.agentId, {
      path: one.path,
      oid: blobIdOf(one.body),
      seenAt: Date.now(),
      carriedOid: null,
    })
  }
}

export function carryLanded(
  root: string,
  base: string,
  running: Running,
  changes: readonly FileEdit[],
  handed: readonly Carry[]
): undefined {
  const held: Carry[] = running.readersOweReading ? [] : [...handed]
  const owed: string[] = []
  for (const one of changes) {
    if (one.readersOweReading ?? running.readersOweReading) {
      owed.push(one.path)
      continue
    }
    if (one.body === null) continue
    const was = bodyAt(root, base, one.path)
    if (was === null) continue
    held.push({ was: one.path, now: one.path, from: blobIdOf(was) })
  }
  carryReadings(root, held)
  dropReadings(root, owed)
}

export function asReadIn(given: Given, changes: readonly FileEdit[]): readonly Reading[] {
  if (given.agentId === null) return []
  const held: Reading[] = []
  for (const one of changes) {
    const seen = readingIn(given.root, given.agentId, one.path)
    if (seen !== null) held.push(seen)
  }
  return held
}
