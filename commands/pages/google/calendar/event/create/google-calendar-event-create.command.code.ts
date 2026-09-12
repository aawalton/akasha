import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { attendees } from "akasha/commands/arguments/pages/attendees.argument.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { description } from "akasha/commands/arguments/pages/description.argument.ts"
import { end } from "akasha/commands/arguments/pages/end.argument.ts"
import { location } from "akasha/commands/arguments/pages/location.argument.ts"
import { recurrence } from "akasha/commands/arguments/pages/recurrence.argument.ts"
import { sendUpdates } from "akasha/commands/arguments/pages/send-updates.argument.ts"
import { start } from "akasha/commands/arguments/pages/start.argument.ts"
import { summary } from "akasha/commands/arguments/pages/summary.argument.ts"
import { timezone } from "akasha/commands/arguments/pages/timezone.argument.ts"
import {
  answering,
  asAlan,
  eventsIn,
  inputOf,
  sendingRefused,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventCreate as page } from "akasha/commands/pages/google/calendar/event/create/google-calendar-event-create.command.ts"

const NAMED = [
  calendar,
  sendUpdates,
  summary,
  start,
  end,
  description,
  location,
  attendees,
  timezone,
  recurrence,
] as const

export function googleCalendarEventCreate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  const why = sendingRefused(taken.sendUpdates)
  if (why.length > 0) return Promise.resolve(mistaking(why))
  return answering(given.calledAs, async (done) =>
    (await eventsIn()).createEvent(await asAlan(), inputOf(taken), done)
  )
}
