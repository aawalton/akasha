import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { attendees } from "akasha/command/argument/pages/attendees.argument.ts"
import { calendar } from "akasha/command/argument/pages/calendar.argument.ts"
import { description } from "akasha/command/argument/pages/description.argument.ts"
import { end } from "akasha/command/argument/pages/end.argument.ts"
import { event } from "akasha/command/argument/pages/event.argument.ts"
import { location } from "akasha/command/argument/pages/location.argument.ts"
import { recurrence } from "akasha/command/argument/pages/recurrence.argument.ts"
import { sendUpdates } from "akasha/command/argument/pages/send-updates.argument.ts"
import { start } from "akasha/command/argument/pages/start.argument.ts"
import { summary } from "akasha/command/argument/pages/summary.argument.ts"
import { timezone } from "akasha/command/argument/pages/timezone.argument.ts"
import {
  answeredAsJson,
  asAlan,
  eventsIn,
  patchOf,
  sendingRefused,
} from "akasha/command/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventUpdate as page } from "akasha/command/pages/google/calendar/event/update/google-calendar-event-update.command.ts"

const NAMED = [
  event,
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

export function googleCalendarEventUpdate(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  const why = sendingRefused(taken.sendUpdates)
  if (why.length > 0) return Promise.resolve(mistaking(why))
  return answeredAsJson(async (done) =>
    (await eventsIn()).updateEvent(await asAlan(), patchOf(taken), done)
  )
}
