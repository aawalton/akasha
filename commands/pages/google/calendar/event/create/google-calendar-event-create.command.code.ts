import {
  answeredBy,
  asAlan,
  CALENDAR,
  END,
  eventsIn,
  inputOf,
  readIn,
  SENDING,
  SHAPING,
  START,
  SUMMARY,
  type Wanted,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"

const WANTED: Wanted = {
  takes: [CALENDAR, ...SHAPING, SENDING],
  needs: [SUMMARY, START, END],
  inPlace: false,
}

export function googleCalendarEventCreate(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredBy(readIn(argv, WANTED), given.calledAs, async (read) =>
    (await eventsIn()).createEvent(await asAlan(), inputOf(read))
  )
}
