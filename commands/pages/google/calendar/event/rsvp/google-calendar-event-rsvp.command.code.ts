import {
  answeredBy,
  asAlan,
  CALENDAR,
  EVENT,
  eventsIn,
  readIn,
  rsvpOf,
  SENDING,
  STATUS,
  type Wanted,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const WANTED: Wanted = {
  takes: [CALENDAR, EVENT, STATUS, SENDING],
  needs: [EVENT, STATUS],
  inPlace: true,
}

export function googleCalendarEventRsvp(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredBy(readIn(argv, WANTED), given.calledAs, async (read) =>
    (await eventsIn()).rsvpEvent(await asAlan(), rsvpOf(read))
  )
}
