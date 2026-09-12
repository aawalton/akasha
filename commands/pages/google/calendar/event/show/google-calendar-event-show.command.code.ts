import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import {
  answeredAsJson,
  asAkasha,
  eventsIn,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventShow as page } from "akasha/commands/pages/google/calendar/event/show/google-calendar-event-show.command.ts"

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
