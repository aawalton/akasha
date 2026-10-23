import { closeSync, fstatSync, openSync, readSync } from "node:fs"
import { join } from "node:path"
import {
  exemptIn,
  reasonsFor,
} from "akasha/check/code/pages/no-raw-nul-bytes/no-raw-nul-bytes.check-code.decision.code.ts"
import { commitIn } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"

const FIRST_ROOM = 1 << 20

type Room = { held: Uint8Array }

function openedAt(at: string): number | null {
  try {
    return openSync(at, "r")
  } catch {
    return null
  }
}

function bytesInto(room: Room, at: string): Uint8Array | null {
  const opened = openedAt(at)
  if (opened === null) return null
  try {
    const stated = fstatSync(opened)
    if (!stated.isFile()) return null
    if (stated.size > room.held.length) room.held = new Uint8Array(stated.size)
    let got = 0
    while (got < stated.size) {
      const read = readSync(opened, room.held, got, stated.size - got, null)
      if (read === 0) break
      got += read
    }
    return room.held.subarray(0, got)
  } finally {
    closeSync(opened)
  }
}

export function noRawNulBytes(root: string): readonly Judged[] {
  const commit = commitIn(root)
  const room: Room = { held: new Uint8Array(FIRST_ROOM) }
  const said: Judged[] = []
  for (const path of commit.paths) {
    if (exemptIn(path, commit)) continue
    const bytes = bytesInto(room, join(root, path))
    if (bytes === null) continue
    for (const reason of reasonsFor(bytes)) said.push({ path, reason })
  }
  return said
}
