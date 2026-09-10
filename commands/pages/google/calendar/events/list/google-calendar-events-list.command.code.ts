import {
  answeredBy,
  asAkasha,
  CALENDAR,
  eventsIn,
  FROM,
  MAX,
  maxOf,
  QUERY,
  readIn,
  TO,
  type Wanted,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "../../../../../modules/calling/calling.module.code.ts"

const WANTED: Wanted = { takes: [CALENDAR, FROM, TO, QUERY, MAX], needs: [], inPlace: false }

export function googleCalendarEventsList(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredBy(readIn(argv, WANTED), given.calledAs, async ({ said }) =>
    (await eventsIn()).listEvents(await asAkasha(), {
      calendarId: said.get(CALENDAR),
      from: said.get(FROM),
      to: said.get(TO),
      query: said.get(QUERY),
      max: maxOf(said.get(MAX)),
    })
  )
}
