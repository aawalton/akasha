import { takenFor } from "akasha/command/arguments/modules/taking/argument-taking.module.code.ts"
import { calendar } from "akasha/command/arguments/pages/calendar.argument.ts"
import { eventQuery } from "akasha/command/arguments/pages/event-query.argument.ts"
import { max } from "akasha/command/arguments/pages/max.argument.ts"
import { windowFrom } from "akasha/command/arguments/pages/window-from.argument.ts"
import { windowTo } from "akasha/command/arguments/pages/window-to.argument.ts"
import {
  answeredAsJson,
  asAkasha,
  eventsIn,
} from "akasha/command/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/command/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventList as page } from "akasha/command/pages/google/calendar/event/list/google-calendar-event-list.command.ts"

const PAGES = [calendar, windowFrom, windowTo, eventQuery, max]

export function googleCalendarEventList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  return answeredAsJson(async () =>
    (await eventsIn()).listEvents(await asAkasha(), {
      calendarId: taken.calendar,
      from: taken.windowFrom,
      to: taken.windowTo,
      query: taken.eventQuery,
      max: taken.max,
    })
  )
}
