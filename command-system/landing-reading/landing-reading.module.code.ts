import type { Given } from "../calling/calling.module.code.ts"
import { bodyAt } from "../commit-reading/commit-reading.module.code.ts"
import type { FileEdit } from "../landing/landing.module.code.ts"
import {
  blobIdOf,
  type Carry,
  carryReadings,
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
      mechanicalOid: null,
    })
  }
}

export function carryLanded(
  given: Given,
  base: string,
  changes: readonly FileEdit[],
  handed: readonly Carry[]
): undefined {
  if (given.changeKind?.readersOweReading !== false) return
  const held: Carry[] = [...handed]
  for (const one of changes) {
    if (one.body === null) continue
    const was = bodyAt(given.root, base, one.path)
    if (was === null) continue
    held.push({ was: one.path, now: one.path, from: blobIdOf(was) })
  }
  carryReadings(given.root, held)
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
