import { readMountainWallTime } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { mistaking } from "../../../../../command-system/asking/asking.module.code.ts"
import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../../../../modules/session-acting/session-acting.module.code.ts"
import {
  AT,
  addressed,
  carriedIn,
  DRY_RUN,
  faultsIn,
  levelsFor,
  mintedAt,
  type Row,
  saidFor,
  shownOf,
  TITLE,
  taggedFor,
  taggingOf,
} from "../../../../modules/session-rows/session-rows.module.code.ts"

export async function trackSessionSplit(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = addressed(argv, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const said = saidFor(argv, AT)
  if (said === null) return mistaking([`${AT} names the time the stretch is parted at`])
  const reading = readMountainWallTime(said, now)
  if (reading.read === "refused") return mistaking([reading.saying])
  const parted = reading.at.getTime()
  const from = new Date(found.startTime).getTime()
  const to =
    found.endTime === undefined ? Number.POSITIVE_INFINITY : new Date(found.endTime).getTime()
  if (parted <= from || parted >= to) {
    return mistaking([`${said} falls outside the stretch this parts`])
  }
  const title = saidFor(argv, TITLE) ?? found.title
  const levels = levelsFor(argv, title, found, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const next: Row = {
    id: mintedAt(now),
    title,
    startTime: reading.iso,
    dailyTracking: standing.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, title, carriedIn(found), tagging.known)),
  }
  if (found.endTime !== undefined) next.endTime = found.endTime
  found.endTime = reading.iso
  standing.rows.splice(standing.rows.indexOf(found) + 1, 0, next)
  const faults = faultsIn(standing.rows, standing.held.page)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf([found, next]))
  return await landed(
    standing.held,
    standing.rows,
    `Split ${found.title} on ${standing.day}`,
    given
  )
}
