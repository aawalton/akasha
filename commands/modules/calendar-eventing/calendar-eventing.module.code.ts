import type {
  EventInput,
  EventPatch,
  RsvpStatus,
} from "akasha/alan/google/calendar/calendar-event-shapes/calendar-event-shapes.module.code.ts"
import {
  narrowSendUpdates,
  SEND_UPDATES,
} from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import {
  answering,
  asIndentedJson,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"

import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const SENDING = "--send-updates"

export const STATUS = "--status"

const STATUSES: readonly RsvpStatus[] = ["accepted", "declined", "tentative"]

function emails(raw: string | undefined): readonly string[] | undefined {
  return raw === undefined ? undefined : raw.split(",").map((one) => one.trim())
}

function rules(said: readonly string[]): readonly string[] | undefined {
  return said.length > 0 ? said : undefined
}

export type Shaping = {
  readonly calendar?: string | undefined
  readonly summary?: string | undefined
  readonly start?: string | undefined
  readonly end?: string | undefined
  readonly description?: string | undefined
  readonly location?: string | undefined
  readonly attendees?: string | undefined
  readonly timezone?: string | undefined
  readonly recurrence: readonly string[]
  readonly sendUpdates?: string | undefined
}

export type Patching = Shaping & { readonly event: string }

export function inputOf(taken: Shaping): EventInput {
  return {
    calendarId: taken.calendar,
    summary: taken.summary ?? "",
    start: taken.start ?? "",
    end: taken.end ?? "",
    description: taken.description,
    location: taken.location,
    attendees: emails(taken.attendees),
    timezone: taken.timezone,
    recurrence: rules(taken.recurrence),
    sendUpdates: narrowSendUpdates(taken.sendUpdates),
  }
}

export function patchOf(taken: Patching): EventPatch {
  return {
    calendarId: taken.calendar,
    eventId: taken.event,
    summary: taken.summary,
    start: taken.start,
    end: taken.end,
    description: taken.description,
    location: taken.location,
    attendees: emails(taken.attendees),
    timezone: taken.timezone,
    recurrence: rules(taken.recurrence),
    sendUpdates: narrowSendUpdates(taken.sendUpdates),
  }
}

export type Rsvping = { readonly status: RsvpStatus } | { readonly refused: readonly string[] }

export function rsvpStatusIn(said: string): Rsvping {
  const held = STATUSES.find((one) => one === said)
  if (held === undefined) {
    return {
      refused: [`\`${STATUS}\` takes ${namesDrawn(STATUSES)}, and \`${said}\` is none of them`],
    }
  }
  return { status: held }
}

export function sendingRefused(said: string | undefined): readonly string[] {
  if (said === undefined || SEND_UPDATES.some((one) => one === said)) return []
  return [`\`${SENDING}\` takes ${namesDrawn(SEND_UPDATES)}, and \`${said}\` is none of them`]
}

export async function asAlan() {
  return await (
    await import(
      "akasha/alan/google/calendar/modules/calendar-client/calendar-client.module.code.ts"
    )
  ).makeOAuthCalendarClient()
}

export async function asAkasha() {
  return await (
    await import(
      "akasha/alan/google/calendar/modules/calendar-client/calendar-client.module.code.ts"
    )
  ).makeCalendarClient()
}

export async function eventsIn() {
  return await import("akasha/alan/google/calendar/calendar-events/calendar-events.module.code.ts")
}

export function answeredAsJson(work: (done: string[]) => Promise<unknown>): Promise<Answer> {
  return answering(async (done) => asIndentedJson(await work(done)))
}
