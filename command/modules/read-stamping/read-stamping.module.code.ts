import { blobIdOf } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type {
  FileChange,
  Answer as Said,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  type Machine,
  PUT_BACK,
} from "akasha/command/modules/change-freshness/change-freshness.module.code.ts"
import { foldedAt } from "akasha/command/modules/landing-change-composing/landing-change-composing.module.code.ts"
import { bytesAt as onDisk } from "akasha/domain/context/modules/warranting/warranting.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"

export function readStamped(root: string, edits: readonly FileChange[]): readonly FileChange[] {
  return edits.map((one) => {
    if (one.kind === "move" || one.writerOwesReading === false || one.readOid !== undefined) {
      return one
    }
    const bytes = onDisk(root, one.path)
    return bytes === null ? one : { ...one, readOid: blobIdOf(bytes) }
  })
}

export function readFromIn(said: Said): ReadonlyMap<string, string> {
  const read = new Map<string, string>()
  for (const one of said.edits) {
    if (one.kind === "move" || one.readOid === undefined || read.has(one.path)) continue
    read.set(one.path, one.readOid)
  }
  return read
}

export function movedSinceRead(
  root: string,
  base: string,
  readFrom: ReadonlyMap<string, string>,
  machine: Machine,
  tail: string
): readonly string[] | null {
  const moved: string[] = []
  for (const [path, oid] of readFrom) {
    if (machine.wrote.has(path) || machine.grouped.has(path) || foldedAt(path)) continue
    const now = bodyAt(root, base, path) ?? onDisk(root, path)
    if (now === null || blobIdOf(now) !== oid) moved.push(path)
  }
  if (moved.length === 0) return null
  return [
    `${moved.sort().join(", ")} — edited against a body that is not the body at \`${base}\`, ` +
      PUT_BACK,
    tail,
  ]
}
