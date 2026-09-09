import type { Answer, Given } from "../../../../../command-system/calling/calling.module.code.ts"
import { mistaking } from "../../../../modules/asking/asking.module.code.ts"
import {
  endingIn,
  landedAcross,
  movedInto,
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
  saidFor,
  sayingFor,
  shownOf,
  TITLE,
  taggedFor,
  taggingOf,
} from "../../../../modules/session-rows/session-rows.module.code.ts"
import { sleeping, wokeInto } from "../../../../modules/waking/waking.module.code.ts"

export async function trackSessionSwitch(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const standing = standingFor(argv, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(argv, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = endingIn(given.root, standing.day, standing.held, standing.rows, true)
  if (typeof found === "string") return mistaking([found])
  const ended = instantIn(argv, AT, now)
  if (ended === null) return mistaking([sayingFor(argv, AT, now)])
  if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  found.stretch.endTime = ended
  const woke = sleeping(found.stretch.title) ? wokeInto(ended) : found.held.day
  const home = woke === found.held.day ? found : movedInto(given.root, found, ended)
  if (typeof home === "string") return mistaking([home])
  const title = saidFor(argv, TITLE)
  if (title === null) return mistaking([`${TITLE} names what the next stretch is called`])
  const levels = levelsFor(argv, title, found.stretch, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  home.rows.push({
    id: mintedAt(now),
    title,
    startTime: ended,
    dailyTracking: home.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, title, [], tagging.known)),
  })
  const landings = home === found ? [found] : [found, home]
  const faults = landings.flatMap((one) => faultsIn(one.rows, one.held))
  if (faults.length > 0) return mistaking(faults)
  if (argv.includes(DRY_RUN)) return telling(shownOf(home.rows.slice(-2)))
  const said =
    home === found
      ? `Switch on ${home.held.day}`
      : `Switch on ${home.held.day}, and the sleep it ends opens that day`
  return await landedAcross(landings, said, given)
}
