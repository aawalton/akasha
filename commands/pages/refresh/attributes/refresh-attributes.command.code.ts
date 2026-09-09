import { getEsoDayStr } from "akasha/alan/harness/day/eso-day/eso-day.module.code.ts"
import { keepPointsBeforeToday } from "../../../../alan/attributes/points/attribute-points.module.code.ts"
import {
  ATTRIBUTE_OF,
  takeReadings,
} from "../../../../alan/harness/attributes/reading/attributes-reading.module.code.ts"
import { totalAttributes } from "../../../../alan/harness/attributes/totalling/attributes-totalling.module.code.ts"
import type { Answer, Given } from "../../../../command-system/calling/calling.module.code.ts"

const NOTHING_REBUILT =
  "no attribute could be added up over the days before today, so nothing was rebuilt. A figure " +
  "Alan did not earn would be a lie, and the figures already kept are left as they were."

export function slugsIn(kept: Readonly<Record<string, number>>): ReadonlyMap<string, number> {
  const found = new Map<string, number>()
  for (const [page, points] of Object.entries(kept)) {
    const slug = ATTRIBUTE_OF[page]
    if (slug !== undefined) found.set(slug, points)
  }
  return found
}

export function saidOf(rebuilt: number): string {
  const said = rebuilt === 1 ? "attribute was" : "attributes were"
  return `${rebuilt} ${said} rebuilt from the days before today`
}

export async function refreshAttributes(_argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const before = await totalAttributes(given.root, getEsoDayStr(now))
  const found = slugsIn(before.kept)
  if (found.size === 0) {
    return { report: [], refusals: [NOTHING_REBUILT, ...before.unread], code: 2 }
  }
  for (const [slug, points] of found) keepPointsBeforeToday(given.root, slug, points)
  const taken = await takeReadings(given.root, now)
  const said = [saidOf(found.size), ...before.unread, ...taken.unread]
  return { report: said, refusals: [], code: 0 }
}
