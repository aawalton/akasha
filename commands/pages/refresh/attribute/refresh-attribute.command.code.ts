import { keepPointsBeforeToday } from "akasha/alan/attributes/points/attribute-points.module.code.ts"
import type { Taken } from "akasha/alan/harness/attributes/reading/attributes-reading.module.code.ts"
import {
  ATTRIBUTE_OF,
  takeReadings,
} from "akasha/alan/harness/attributes/reading/attributes-reading.module.code.ts"
import { totalAttributes } from "akasha/alan/harness/attributes/totalling/attributes-totalling.module.code.ts"
import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import {
  answering,
  DATA,
  refusedBy,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { refreshAttribute as page } from "akasha/commands/pages/refresh/attribute/refresh-attribute.command.ts"

const NOTHING_REBUILT =
  "no attribute could be added up over the days before today, so nothing was rebuilt. A figure " +
  "Alan did not earn would be a lie, and the figures already kept are left as they were."

export function slugsIn(kept: Readonly<Record<string, number>>): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const [readout, points] of Object.entries(kept)) {
    const slug = ATTRIBUTE_OF[readout]
    if (slug !== undefined) found.set(slug, points)
  }
  return found
}

export function saidOf(rebuilt: number): string {
  const said = rebuilt === 1 ? "attribute was" : "attributes were"
  return `${rebuilt} ${said} rebuilt from the days before today`
}

export type Keeping = (root: string, slug: string, points: number) => void

export type Taking = (root: string, now: Date, done: string[]) => Promise<Taken>

export function keptEach(
  root: string,
  found: ReadonlyMap<string, number>,
  keeping: Keeping,
  done: string[]
): undefined {
  for (const [slug, points] of found) {
    keeping(root, slug, points)
    done.push(`${slug} carries its points from the days before today`)
  }
  return undefined
}

export async function refreshAttribute(
  argv: readonly string[],
  given: Given,
  keeping: Keeping = keepPointsBeforeToday,
  taking: Taking = takeReadings
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [])
  if ("refused" in read) return mistaking(read.refused)
  const now = new Date()
  const before = await totalAttributes(given.root, getEsoDayStr(now))
  const found = slugsIn(before.kept)
  if (found.size === 0) {
    return refusedBy([NOTHING_REBUILT, ...before.unread], DATA)
  }
  return await answering(async (done) => {
    keptEach(given.root, found, keeping, done)
    const taken = await taking(given.root, now, done)
    return told([saidOf(found.size), ...before.unread, ...taken.unread])
  })
}
