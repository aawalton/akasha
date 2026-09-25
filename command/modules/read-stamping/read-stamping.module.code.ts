import { join } from "node:path"
import {
  blobIdOf,
  SUBAGENT_MARK,
} from "akasha/agent/modules/read-record/read-record.module.code.ts"
import { slugOf } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { seatReadsAt } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
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
import { textThere } from "akasha/file/disk/modules/text-there/text-there.module.code.ts"
import { bodyAt } from "akasha/git/modules/commit-reading/commit-reading.module.code.ts"
import { partedIn } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { z } from "zod"

function stampless(one: FileChange): boolean {
  return one.kind === "move" || one.writerOwesReading === false || one.readOid !== undefined
}

export function readStamped(root: string, edits: readonly FileChange[]): readonly FileChange[] {
  return edits.map((one) => {
    if (stampless(one) || one.kind === "move") return one
    const bytes = onDisk(root, one.path)
    return bytes === null ? one : { ...one, readOid: blobIdOf(bytes) }
  })
}

const READ_BY = z.object({
  path: z.string(),
  oid: z.string(),
  carriedOid: z.string().nullable().optional(),
  readBy: z.string(),
})

function lineIn(line: string): z.infer<typeof READ_BY> | null {
  try {
    return READ_BY.safeParse(JSON.parse(line)).data ?? null
  } catch {
    return null
  }
}

function readByLeft(root: string, seatPage: string): ReadonlyMap<string, Map<string, string>> {
  const found = new Map<string, Map<string, string>>()
  const seat = partedIn(seatPage)?.slug
  const at = seatReadsAt(seatPage)
  const text = seat === undefined || at === null ? null : textThere(join(root, at))
  if (seat === undefined || text === null) return found
  for (const line of text.split("\n")) {
    const said = lineIn(line)
    const cut = said === null ? -1 : said.readBy.indexOf(SUBAGENT_MARK)
    if (said === null || cut < 0) continue
    const left = slugOf(seat, said.readBy.slice(cut + SUBAGENT_MARK.length))
    const paths = found.get(left) ?? new Map<string, string>()
    paths.set(said.path, said.carriedOid ?? said.oid)
    found.set(left, paths)
  }
  return found
}

export type Left = { readonly leftBy: string | null; readonly edit: FileChange | null }

export function takenStamped(
  root: string,
  seatPage: string,
  records: readonly Left[]
): readonly FileChange[] {
  const read = readByLeft(root, seatPage)
  return records.flatMap(({ leftBy, edit }) => {
    if (edit === null) return []
    if (stampless(edit) || edit.kind === "move") return [edit]
    const oid = leftBy === null ? undefined : read.get(leftBy)?.get(edit.path)
    return [oid === undefined ? edit : { ...edit, readOid: oid }]
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
