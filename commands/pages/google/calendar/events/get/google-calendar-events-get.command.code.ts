import {
  answeredBy,
  asAkasha,
  CALENDAR,
  EVENT,
  eventsIn,
  readIn,
  type Wanted,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "../../../../../modules/calling/calling.module.code.ts"

const WANTED: Wanted = { takes: [CALENDAR, EVENT], needs: [EVENT], inPlace: true }

export function googleCalendarEventsGet(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredBy(readIn(argv, WANTED), given.calledAs, async ({ said }) =>
    (await eventsIn()).getEvent(await asAkasha(), {
      calendarId: said.get(CALENDAR),
      eventId: said.get(EVENT) ?? "",
    })
  )
}
