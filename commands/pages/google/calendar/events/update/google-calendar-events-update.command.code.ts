import {
  answeredBy,
  asAlan,
  CALENDAR,
  EVENT,
  eventsIn,
  patchOf,
  readIn,
  SENDING,
  SHAPING,
  type Wanted,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "../../../../../modules/calling/calling.module.code.ts"

const WANTED: Wanted = {
  takes: [CALENDAR, EVENT, ...SHAPING, SENDING],
  needs: [EVENT],
  inPlace: true,
}

export function googleCalendarEventsUpdate(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredBy(readIn(argv, WANTED), given.calledAs, async (read) =>
    (await eventsIn()).updateEvent(await asAlan(), patchOf(read))
  )
}
