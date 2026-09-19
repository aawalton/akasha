import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"
import { difficulty } from "akasha/command/argument/pages/difficulty.argument.ts"

import { relationship } from "akasha/command/argument/pages/relationship.argument.ts"
import { safety } from "akasha/command/argument/pages/safety.argument.ts"
import { title } from "akasha/command/argument/pages/title.argument.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  faultsIn,
  instantIn,
  levelsFor,
  mintedAt,
  sayingFor,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import {
  opensInto,
  sleeping,
} from "akasha/command/pages/track/modules/waking/waking.module.code.ts"
import {
  endingIn,
  landedAcross,
  movedInto,
  standingFor,
  taggingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"
import {
  taggedFor,
  taggingOf,
} from "akasha/command/pages/track/session/modules/session-relationships/session-relationships.module.code.ts"
import { trackSessionSwitch as page } from "akasha/command/pages/track/session/switch/track-session-switch.command.ts"

const NAMED = [day, safety, difficulty, title, at, relationship]

export async function trackSessionSwitch(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = endingIn(given.root, standing.day, standing.held, standing.rows, true)
  if (typeof found === "string") return mistaking([found])
  const ended = instantIn(taken, taken.at, now)
  if (ended === null) return mistaking([sayingFor(taken, taken.at, at.said, now)])
  if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  found.stretch.endTime = ended
  const opened = sleeping(found.stretch.title) ? opensInto(found.stretch.startTime) : found.held.day
  const home = opened === found.held.day ? found : movedInto(given.root, found, opened)
  if (typeof home === "string") return mistaking([home])
  const called = taken.title
  const levels = levelsFor(taken, called, found.stretch, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  home.rows.push({
    id: mintedAt(now),
    title: called,
    startTime: ended,
    dailyTracking: home.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, called, [], tagging.known)),
  })
  const landings = home === found ? [found] : [found, home]
  const faults = landings.flatMap((one) => faultsIn(one.rows, one.held))
  if (faults.length > 0) return mistaking(faults)
  const said =
    home === found
      ? `Switch on ${home.held.day}`
      : `Switch on ${home.held.day}, and the sleep it ends opens that day`
  return await landedAcross(landings, said, given)
}
