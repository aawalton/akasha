import { readMountainWallTime } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../../../../modules/session-acting/session-acting.module.code.ts"
import {
  anchoredIn,
  DRY_RUN,
  END,
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  type Row,
  START,
  saidFor,
  sayingFor,
  shownOf,
  TITLE,
  taggedFor,
  taggingOf,
} from "../../../../modules/session-rows/session-rows.module.code.ts"

export async function trackSessionLog(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const title = saidFor(argv, TITLE)
  if (title === null) return mistaking([`${TITLE} names what the stretch is called`])
  const began = instantIn(argv, START, now)
  if (began === null) return mistaking([sayingFor(argv, START, now)])
  const before = standing.rows[standing.rows.length - 1] ?? null
  const levels = levelsFor(argv, title, before, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const one: Row = {
    id: mintedAt(now),
    title,
    startTime: began,
    dailyTracking: standing.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, title, [], tagging.known)),
  }
  const ended = saidFor(argv, END)
  if (ended === null) return mistaking([`${END} names the wall time the stretch ended`])
  const reading = readMountainWallTime(anchoredIn(argv, ended), now)
  if (reading.read === "refused") return mistaking([reading.saying])
  if (reading.at.getTime() <= new Date(began).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  one.endTime = reading.iso
  standing.rows.push(one)
  standing.rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf([one]))
  return await landed(standing.held, standing.rows, `Log ${title} on ${standing.day}`, given)
}
