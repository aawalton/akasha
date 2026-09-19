import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { at } from "akasha/command/argument/pages/at.argument.ts"
import { day } from "akasha/command/argument/pages/day.argument.ts"

import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import {
  faultsIn,
  instantIn,
  sayingFor,
} from "akasha/command/pages/track/modules/session-rows/session-rows.module.code.ts"
import { trackSessionClose as page } from "akasha/command/pages/track/session/close/track-session-close.command.ts"
import {
  endingIn,
  landed,
  standingFor,
} from "akasha/command/pages/track/session/modules/session-acting/session-acting.module.code.ts"

const NAMED = [day, at]

export async function trackSessionClose(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const found = endingIn(given.root, standing.day, standing.held, standing.rows, false)
  if (typeof found === "string") return mistaking([found])
  const ended = instantIn(taken, taken.at, now)
  if (ended === null) return mistaking([sayingFor(taken, taken.at, at.said, now)])
  if (new Date(ended).getTime() <= new Date(found.stretch.startTime).getTime()) {
    return mistaking(["a stretch cannot end at or before it began"])
  }
  found.stretch.endTime = ended
  const faults = faultsIn(found.rows, found.held)
  if (faults.length > 0) return mistaking(faults)
  return await landed(found.held, found.rows, `Close on ${found.held.day}`, given)
}
