import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { attendees } from "akasha/command/arguments/pages/attendees.argument.ts"
import { calendar } from "akasha/command/arguments/pages/calendar.argument.ts"
import { description } from "akasha/command/arguments/pages/description.argument.ts"
import { end } from "akasha/command/arguments/pages/end.argument.ts"
import { location } from "akasha/command/arguments/pages/location.argument.ts"
import { recurrence } from "akasha/command/arguments/pages/recurrence.argument.ts"
import { sendUpdates } from "akasha/command/arguments/pages/send-updates.argument.ts"
import { start } from "akasha/command/arguments/pages/start.argument.ts"
import { summary } from "akasha/command/arguments/pages/summary.argument.ts"
import { timezone } from "akasha/command/arguments/pages/timezone.argument.ts"
import {
  answeredAsJson,
  asAlan,
  eventsIn,
  inputOf,
  sendingRefused,
} from "akasha/command/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventCreate as page } from "akasha/command/pages/google/calendar/event/create/google-calendar-event-create.command.ts"

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
  return answeredAsJson(async (done) =>
    (await eventsIn()).createEvent(await asAlan(), inputOf(taken), done)
  )
}
