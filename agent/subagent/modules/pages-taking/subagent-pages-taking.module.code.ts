import { rmSync } from "node:fs"
import { join } from "node:path"
import { dropReadings } from "akasha/agent/modules/read-record/read-record.module.code.ts"
import type { Went } from "akasha/agent/subagent/modules/landing-again/subagent-landing-again.module.code.ts"
import {
  type Reading,
  readOf,
} from "akasha/agent/subagent/modules/liveness/subagent-liveness.module.code.ts"
import { pathsUnder } from "akasha/agent/subagent/modules/page-naming/subagent-page-naming.module.code.ts"
import { movedOnto } from "akasha/agent/subagent/modules/recovering/subagent-recovering.module.code.ts"
import { partWay } from "akasha/command/modules/answering/command-answering.module.code.ts"
import { headOf } from "akasha/git/modules/head-commit/head-commit.module.code.ts"
import { pagesOriginHere } from "akasha/infrastructure/service/akasha-service/service-workstation/modules/service-reading/service-reading.module.code.ts"
import { fileKeysAt } from "akasha/page/index/modules/entries/index-entries.module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideOf } from "akasha/page/modules/beside/page-beside.module.code.ts"
import {
  type Writing,
  writingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"
import type { Wrote } from "akasha/page/service/modules/page-writing/page-writing.module.code.ts"

const SEAT = "seat"

export const WRITER = "subagent page sweeper <subagent-page-sweeper@alanwalton.com>"

const WENT: Went = { went: true }

export type Sending = (asked: Writing) => Promise<Wrote>

const overHttp: Sending = (asked) => writingFor(asked, undefined, undefined, pagesOriginHere())

export function seatPageIn(root: string, seatName: string): string | null {
  return listedAt(root, SEAT, seatName)[0]?.path ?? null
}

export async function notWorking(
  root: string,
  under: readonly string[],
  reading: Reading = readOf
): Promise<readonly string[]> {
  const left: string[] = []
  for (const at of under) if ((await reading(root, at)).liveness !== "working") left.push(at)
  return left
}

function besideGone(root: string, paths: readonly string[]): undefined {
  const keys = new Set(fileKeysAt(root).keys())
  for (const one of paths) {
    for (const beside of besideOf(root, one, keys)) rmSync(join(root, beside), { force: true })
  }
}

export async function tookUnder(
  root: string,
  seatName: string,
  why: string,
  done: string[] = [],
  sending: Sending = overHttp,
  reading: Reading = readOf,
  heading: (at: string) => string = headOf
): Promise<Went> {
  const read = heading(root)
  const paths = await notWorking(root, pathsUnder(root, seatName), reading)
  if (paths.length === 0) return WENT
  const seat = seatPageIn(root, seatName)
  if (seat !== null) for (const at of paths) movedOnto(root, seat, at)
  const wrote = await sending({
    writer: WRITER,
    message: `${seatName} ${why}, so the ${String(paths.length)} subagent page(s) under it go`,
    removes: paths,
    read,
  })
  if ("refused" in wrote) return { why: [wrote.refused, ...partWay(done)].join(" ") }
  besideGone(root, paths)
  dropReadings(root, paths)
  return WENT
}
