import type {
  EventInput,
  EventPatch,
  RsvpStatus,
} from "akasha/alan/google/calendar/calendar-event-shapes/calendar-event-shapes.module.code.ts"
import {
  narrowSendUpdates,
  SEND_UPDATES,
} from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import { answering, told } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { namesDrawn } from "akasha/utils/text/name-drawing/name-drawing.module.code.ts"

export const CALENDAR = "--calendar"

export const EVENT = "--event"

export const FROM = "--from"

export const TO = "--to"

export const QUERY = "--query"

export const MAX = "--max"

export const SUMMARY = "--summary"

export const START = "--start"

export const END = "--end"

export const DESCRIPTION = "--description"

export const LOCATION = "--location"

export const ATTENDEES = "--attendees"

export const TIMEZONE = "--timezone"

export const RECURRENCE = "--recurrence"

export const SENDING = "--send-updates"

export const STATUS = "--status"

export const SHAPING: readonly string[] = [
  SUMMARY,
  START,
  END,
  DESCRIPTION,
  LOCATION,
  ATTENDEES,
  TIMEZONE,
  RECURRENCE,
]

const STATUSES: readonly RsvpStatus[] = ["accepted", "declined", "tentative"]

const VALUED = new Set([CALENDAR, EVENT, FROM, TO, QUERY, MAX, ...SHAPING, SENDING, STATUS])

export type Wanted = {
  readonly takes: readonly string[]
  readonly needs: readonly string[]
  readonly inPlace: boolean
}

export type Said = {
  readonly said: ReadonlyMap<string, string>
  readonly recurrence: readonly string[]
}

export type Read = Said | { readonly refused: readonly string[] }

function wholeNumber(raw: string): number | null {
  if (!/^\d+$/.test(raw)) return null
  const held = Number(raw)
  return Number.isSafeInteger(held) ? held : null
}

function emails(raw: string | undefined): readonly string[] | undefined {
  return raw === undefined ? undefined : raw.split(",").map((one) => one.trim())
}

function rules(said: readonly string[]): readonly string[] | undefined {
  return said.length > 0 ? said : undefined
}

function reading(argv: readonly string[]): {
  readonly refusals: readonly string[]
  readonly words: readonly string[]
  readonly said: Map<string, string>
  readonly recurrence: readonly string[]
} {
  const refusals: string[] = []
  const words: string[] = []
  const said = new Map<string, string>()
  const recurrence: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const one = argv[at]
    if (one === undefined) continue
    if (!one.startsWith("-")) {
      words.push(one)
      continue
    }
    if (!VALUED.has(one)) {
      refusals.push(`\`${one}\` is no flag this takes`)
      continue
    }
    const value = argv[at + 1]
    if (value === undefined || value.startsWith("--")) {
      refusals.push(`\`${one}\` takes a value, and none followed it`)
      continue
    }
    at += 1
    if (one === RECURRENCE) {
      recurrence.push(value)
      continue
    }
    if (said.has(one)) {
      refusals.push(`\`${one}\` is said twice over, and it takes one value`)
      continue
    }
    said.set(one, value)
  }
  return { refusals, words, said, recurrence }
}

function placing(
  wanted: Wanted,
  words: readonly string[],
  said: Map<string, string>,
  refusals: string[]
): undefined {
  const first = words[0]
  if (first === undefined) return
  if (!wanted.inPlace) {
    refusals.push(`\`${first}\` is no word this takes, which names nothing in place`)
    return
  }
  if (words.length > 1) {
    refusals.push(`\`${words[1]}\` follows the event, and one call names one event`)
    return
  }
  if (said.has(EVENT)) {
    refusals.push(`\`${first}\` names the event in place where \`${EVENT}\` names it too`)
    return
  }
  said.set(EVENT, first)
}

function valuing(wanted: Wanted, said: ReadonlyMap<string, string>, refusals: string[]): undefined {
  const max = said.get(MAX)
  if (max !== undefined && wholeNumber(max) === null) {
    refusals.push(`\`${MAX}\` takes a whole number of events, and \`${max}\` is none`)
  }
  const status = said.get(STATUS)
  if (status !== undefined && !STATUSES.some((one) => one === status)) {
    refusals.push(`\`${STATUS}\` takes ${namesDrawn(STATUSES)}, and \`${status}\` is none of them`)
  }
  const sending = said.get(SENDING)
  if (sending !== undefined && !SEND_UPDATES.some((one) => one === sending)) {
    refusals.push(
      `\`${SENDING}\` takes ${namesDrawn(SEND_UPDATES)}, and \`${sending}\` is none of them`
    )
  }
  for (const one of wanted.needs) {
    if (!said.has(one)) refusals.push(`this takes \`${one}\`, and none was said`)
  }
}

export function readIn(argv: readonly string[], wanted: Wanted): Read {
  const held = reading(argv)
  const refusals = [...held.refusals]
  placing(wanted, held.words, held.said, refusals)
  for (const one of held.said.keys()) {
    if (!wanted.takes.includes(one)) refusals.push(`\`${one}\` is no flag this act takes`)
  }
  if (held.recurrence.length > 0 && !wanted.takes.includes(RECURRENCE)) {
    refusals.push(`\`${RECURRENCE}\` is no flag this act takes`)
  }
  valuing(wanted, held.said, refusals)
  if (refusals.length > 0) return { refused: refusals }
  return { said: held.said, recurrence: held.recurrence }
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

export function rsvpOf(read: Said): {
  readonly calendarId: string | undefined
  readonly eventId: string
  readonly status: RsvpStatus
  readonly sendUpdates: ReturnType<typeof narrowSendUpdates>
} {
  const { said } = read
  return {
    calendarId: said.get(CALENDAR),
    eventId: said.get(EVENT) ?? "",
    status: (said.get(STATUS) ?? "accepted") as RsvpStatus,
    sendUpdates: narrowSendUpdates(said.get(SENDING)),
  }
}

export async function asAlan() {
  return await (
    await import("akasha/alan/google/calendar/calendar-client/calendar-client.module.code.ts")
  ).makeOAuthCalendarClient()
}

export async function asAkasha() {
  return await (
    await import("akasha/alan/google/calendar/calendar-client/calendar-client.module.code.ts")
  ).makeCalendarClient()
}

export async function eventsIn() {
  return await import("akasha/alan/google/calendar/calendar-events/calendar-events.module.code.ts")
}

export function answeredAsJson(work: (done: string[]) => Promise<unknown>): Promise<Answer> {
  return answering(async (done) => told(JSON.stringify(await work(done), null, 2).split("\n")))
}

export function answeredAsJsonBy(
  read: Read,
  work: (taken: Said, done: string[]) => Promise<unknown>
): Promise<Answer> {
  if ("refused" in read) return Promise.resolve(mistaking(read.refused))
  return answeredAsJson((done) => work(read, done))
}
