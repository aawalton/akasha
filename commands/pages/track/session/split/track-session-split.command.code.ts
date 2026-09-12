import { readMountainWallTime } from "akasha/alan/harness/day/mountain-wall/mountain-wall.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { at } from "akasha/commands/arguments/pages/at.argument.ts"
import { day } from "akasha/commands/arguments/pages/day.argument.ts"
import { difficulty } from "akasha/commands/arguments/pages/difficulty.argument.ts"
import { dryRun } from "akasha/commands/arguments/pages/dry-run.argument.ts"
import { id } from "akasha/commands/arguments/pages/id.argument.ts"
import { last } from "akasha/commands/arguments/pages/last.argument.ts"
import { open } from "akasha/commands/arguments/pages/open.argument.ts"
import { relationship } from "akasha/commands/arguments/pages/relationship.argument.ts"
import { safety } from "akasha/commands/arguments/pages/safety.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import {
  landed,
  standingFor,
  taggingFor,
  telling,
} from "akasha/commands/pages/track/session/session-acting/session-acting.module.code.ts"
import {
  carriedIn,
  taggedFor,
  taggingOf,
} from "akasha/commands/pages/track/session/session-relationships/session-relationships.module.code.ts"
import { trackSessionSplit as page } from "akasha/commands/pages/track/session/split/track-session-split.command.ts"
import {
  addressed,
  anchoredIn,
  faultsIn,
  levelsFor,
  mintedAt,
  type Row,
  shownOf,
} from "akasha/commands/pages/track/session-rows/session-rows.module.code.ts"

const NAMED = [dryRun, day, at, id, open, last, title, safety, difficulty, relationship]

export async function trackSessionSplit(argv: readonly string[], given: Given): Promise<Answer> {
  const now = new Date()
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const taken = read.taken
  const standing = standingFor(taken, given.root, now)
  if (typeof standing === "string") return mistaking([standing])
  const tagging = taggingFor(taken, given.root)
  if (tagging.read === "refused") return mistaking(tagging.refusals)
  const found = addressed(taken, standing.rows, now)
  if (typeof found === "string") return mistaking([found])
  const said = taken.at
  const reading = readMountainWallTime(anchoredIn(taken, said), now)
  if (reading.read === "refused") return mistaking([reading.saying])
  const parted = reading.at.getTime()
  const from = new Date(found.startTime).getTime()
  const to =
    found.endTime === undefined ? Number.POSITIVE_INFINITY : new Date(found.endTime).getTime()
  if (parted <= from || parted >= to) {
    return mistaking([`${said} falls outside the stretch this parts`])
  }
  const called = taken.title ?? found.title
  const levels = levelsFor(taken, called, found, standing.activities)
  if (levels.read === "refused") return mistaking(levels.refusals)
  const next: Row = {
    id: mintedAt(now),
    title: called,
    startTime: reading.iso,
    dailyTracking: standing.held.page,
    ...levels.levels,
    ...taggingOf(taggedFor(tagging.stated, called, carriedIn(found), tagging.known)),
  }
  if (found.endTime !== undefined) next.endTime = found.endTime
  found.endTime = reading.iso
  standing.rows.splice(standing.rows.indexOf(found) + 1, 0, next)
  const faults = faultsIn(standing.rows, standing.held)
  if (faults.length > 0) return mistaking(faults)
  if (standing.dryRun) return telling(shownOf([found, next]))
  return await landed(
    standing.held,
    standing.rows,
    `Split ${found.title} on ${standing.day}`,
    given
  )
}
