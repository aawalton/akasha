import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { eventQuery } from "akasha/commands/arguments/pages/event-query.argument.ts"
import { max } from "akasha/commands/arguments/pages/max.argument.ts"
import { windowFrom } from "akasha/commands/arguments/pages/window-from.argument.ts"
import { windowTo } from "akasha/commands/arguments/pages/window-to.argument.ts"
import {
  answering,
  asAkasha,
  eventsIn,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventList as page } from "akasha/commands/pages/google/calendar/event/list/google-calendar-event-list.command.ts"

const PAGES = [calendar, windowFrom, windowTo, eventQuery, max]

export function googleCalendarEventList(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, PAGES)
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  return answering(given.calledAs, async () =>
    (await eventsIn()).listEvents(await asAkasha(), {
      calendarId: taken.calendar,
      from: taken.windowFrom,
      to: taken.windowTo,
      query: taken.eventQuery,
      max: taken.max,
    })
  )
}
