import { takenFor } from "akasha/command/argument/modules/taking/argument-taking.module.code.ts"
import { calendar } from "akasha/command/argument/pages/calendar.argument.ts"
import { event } from "akasha/command/argument/pages/event.argument.ts"
import {
  answeredAsJson,
  asAkasha,
  eventsIn,
} from "akasha/command/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventShow as page } from "akasha/command/pages/google/calendar/event/show/google-calendar-event-show.command.ts"

export function googleCalendarEventShow(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [event, calendar])
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  return answeredAsJson(async () =>
    (await eventsIn()).getEvent(await asAkasha(), {
      calendarId: taken.calendar,
      eventId: taken.event,
    })
  )
}
