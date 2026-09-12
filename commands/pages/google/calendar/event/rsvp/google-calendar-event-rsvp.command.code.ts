import { narrowSendUpdates } from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import { takenFor } from "akasha/commands/arguments/argument-taking/argument-taking.module.code.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import { sendUpdates } from "akasha/commands/arguments/pages/send-updates.argument.ts"
import { status } from "akasha/commands/arguments/pages/status.argument.ts"
import {
  answering,
  asAlan,
  eventsIn,
  rsvpStatusIn,
  sendingRefused,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { googleCalendarEventRsvp as page } from "akasha/commands/pages/google/calendar/event/rsvp/google-calendar-event-rsvp.command.ts"

export function googleCalendarEventRsvp(argv: readonly string[], given: Given): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, [event, calendar, sendUpdates, status])
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  const taken = read.taken
  const rsvping = rsvpStatusIn(taken.status)
  const why = [
    ...("refused" in rsvping ? rsvping.refused : []),
    ...sendingRefused(taken.sendUpdates),
  ]
  if (why.length > 0 || "refused" in rsvping) return Promise.resolve(mistaking(why))
  return answering(given.calledAs, async (done) =>
    (await eventsIn()).rsvpEvent(
      await asAlan(),
      {
        calendarId: taken.calendar,
        eventId: taken.event,
        status: rsvping.status,
        sendUpdates: narrowSendUpdates(taken.sendUpdates),
      },
      done
    )
  )
}
