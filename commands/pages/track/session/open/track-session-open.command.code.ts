import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "../../../../modules/session-acting/session-acting.module.code.ts"
import {
  AT,
  DRY_RUN,
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  openIn,
  type Row,
  saidFor,
  sayingFor,
  shownOf,
  TITLE,
  taggedFor,
  taggingOf,
} from "../../../../modules/session-rows/session-rows.module.code.ts"

export async function trackSessionOpen(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  if (openIn(standing.rows) !== null) {
    return mistaking(["this day carries an open stretch already, so nothing opens here"])
  }
  const title = saidFor(argv, TITLE)
  if (title === null) return mistaking([`${TITLE} names what the stretch is called`])
  const began = instantIn(argv, AT, now)
  if (began === null) return mistaking([sayingFor(argv, AT, now)])
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
  standing.rows.push(one)
  standing.rows.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf([one]))
  return await landed(standing.held, standing.rows, `Open ${title} on ${standing.day}`, given)
}
