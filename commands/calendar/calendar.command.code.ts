import { exitCodeForThrowable } from "@akasha/errors-core/exit-code"
import { CALENDAR_OAUTH_SCOPE } from "@akasha/google-calendar/env"
import { narrowSendUpdates, SEND_UPDATES } from "@akasha/google-calendar/send-updates-narrowing"
import type { EventInput, EventPatch, RsvpStatus } from "@akasha/google-calendar/types"
import { readGoogleOauthAppCredentials } from "@akasha/google-oauth/oauth-app-credentials"
import { googleOauthConsent } from "@akasha/google-oauth/oauth-consent"
import type { Answer, Given } from "../../command-system/calling/calling.module.code.ts"
import { whyOf } from "../../command-system/fault-saying/fault-saying.module.code.ts"

export const AUTH = "auth"

export const EVENTS = "events"

const LOGIN = "login"

const CREATE = "create"

const DELETE = "delete"

const GET = "get"

const LIST = "list"

const RSVP = "rsvp"

const UPDATE = "update"

const CALLBACK_URL = "--callback-url"

const CALENDAR = "--calendar"

const EVENT = "--event"

const FROM = "--from"

const TO = "--to"

const QUERY = "--query"

const MAX = "--max"

const SUMMARY = "--summary"

const START = "--start"

const END = "--end"

const DESCRIPTION = "--description"

const LOCATION = "--location"

const ATTENDEES = "--attendees"

const TIMEZONE = "--timezone"

const RECURRENCE = "--recurrence"

const SENDING = "--send-updates"

const STATUS = "--status"

const REFRESH_TOKEN_VAR = "GOOGLE_CALENDAR_OAUTH_REFRESH_TOKEN"

const STATUSES: readonly RsvpStatus[] = ["accepted", "declined", "tentative"]

const ACTS: Readonly<Record<string, readonly string[]>> = {
  [AUTH]: [LOGIN],
  [EVENTS]: [CREATE, DELETE, GET, LIST, RSVP, UPDATE],
}

const SHAPING = [SUMMARY, START, END, DESCRIPTION, LOCATION, ATTENDEES, TIMEZONE, RECURRENCE]

const TAKES: Readonly<Record<string, readonly string[]>> = {
  [`${AUTH} ${LOGIN}`]: [CALLBACK_URL],
  [`${EVENTS} ${LIST}`]: [CALENDAR, FROM, TO, QUERY, MAX],
  [`${EVENTS} ${GET}`]: [CALENDAR, EVENT],
  [`${EVENTS} ${DELETE}`]: [CALENDAR, EVENT],
  [`${EVENTS} ${CREATE}`]: [CALENDAR, ...SHAPING, SENDING],
  [`${EVENTS} ${UPDATE}`]: [CALENDAR, EVENT, ...SHAPING, SENDING],
  [`${EVENTS} ${RSVP}`]: [CALENDAR, EVENT, STATUS, SENDING],
}

const NEEDS: Readonly<Record<string, readonly string[]>> = {
  [`${EVENTS} ${GET}`]: [EVENT],
  [`${EVENTS} ${DELETE}`]: [EVENT],
  [`${EVENTS} ${CREATE}`]: [SUMMARY, START, END],
  [`${EVENTS} ${UPDATE}`]: [EVENT],
  [`${EVENTS} ${RSVP}`]: [EVENT, STATUS],
}

const IN_PLACE = new Set([
  `${EVENTS} ${GET}`,
  `${EVENTS} ${DELETE}`,
  `${EVENTS} ${UPDATE}`,
  `${EVENTS} ${RSVP}`,
])

const VALUED = new Set([
  CALLBACK_URL,
  CALENDAR,
  EVENT,
  FROM,
  TO,
  QUERY,
  MAX,
  SUMMARY,
  START,
  END,
  DESCRIPTION,
  LOCATION,
  ATTENDEES,
  TIMEZONE,
  RECURRENCE,
  SENDING,
  STATUS,
])

export type Read =
  | {
      readonly act: string
      readonly said: ReadonlyMap<string, string>
      readonly recurrence: readonly string[]
    }
  | { readonly refused: readonly string[] }

function listed(said: readonly string[]): string {
  return said.map((one) => `\`${one}\``).join(", ")
}

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

function jsonSaid(value: unknown): readonly string[] {
  return JSON.stringify(value, null, 2).split("\n")
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

function actIn(words: readonly string[], refusals: string[]): string | null {
  const on = words[0]
  if (on === undefined) {
    refusals.push(`this names nothing to act on — it acts on ${listed(Object.keys(ACTS))}`)
    return null
  }
  const acts = ACTS[on]
  if (acts === undefined) {
    refusals.push(`\`${on}\` is nothing this acts on — it acts on ${listed(Object.keys(ACTS))}`)
    return null
  }
  const act = words[1]
  if (act === undefined) {
    refusals.push(`\`${on}\` names no act — it carries ${listed(acts)}`)
    return null
  }
  if (!acts.includes(act)) {
    refusals.push(`\`${act}\` is no act \`${on}\` carries — it carries ${listed(acts)}`)
    return null
  }
  return `${on} ${act}`
}

function placing(
  act: string,
  rest: readonly string[],
  said: Map<string, string>,
  refusals: string[]
): void {
  const first = rest[0]
  if (first === undefined) return
  if (!IN_PLACE.has(act)) {
    refusals.push(`\`${first}\` follows \`${act}\`, which names nothing in place`)
    return
  }
  if (rest.length > 1) {
    refusals.push(`\`${rest[1]}\` follows the event, and one call names one event`)
    return
  }
  if (said.has(EVENT)) {
    refusals.push(`\`${first}\` names the event in place where \`${EVENT}\` names it too`)
    return
  }
  said.set(EVENT, first)
}

function valuing(act: string, said: ReadonlyMap<string, string>, refusals: string[]): void {
  const max = said.get(MAX)
  if (max !== undefined && wholeNumber(max) === null) {
    refusals.push(`\`${MAX}\` takes a whole number of events, and \`${max}\` is none`)
  }
  const status = said.get(STATUS)
  if (status !== undefined && !STATUSES.some((one) => one === status)) {
    refusals.push(`\`${STATUS}\` takes ${listed(STATUSES)}, and \`${status}\` is none of them`)
  }
  const sending = said.get(SENDING)
  if (sending !== undefined && !SEND_UPDATES.some((one) => one === sending)) {
    refusals.push(
      `\`${SENDING}\` takes ${listed(SEND_UPDATES)}, and \`${sending}\` is none of them`
    )
  }
  for (const one of NEEDS[act] ?? []) {
    if (!said.has(one)) refusals.push(`\`${act}\` takes \`${one}\`, and none was said`)
  }
}

export function readIn(argv: readonly string[]): Read {
  const held = reading(argv)
  const refusals = [...held.refusals]
  const act = actIn(held.words, refusals)
  if (act === null) return { refused: refusals }
  placing(act, held.words.slice(2), held.said, refusals)
  const takes = TAKES[act] ?? []
  for (const one of held.said.keys()) {
    if (!takes.includes(one)) refusals.push(`\`${one}\` is no flag \`${act}\` takes`)
  }
  if (held.recurrence.length > 0 && !takes.includes(RECURRENCE)) {
    refusals.push(`\`${RECURRENCE}\` is no flag \`${act}\` takes`)
  }
  valuing(act, held.said, refusals)
  if (refusals.length > 0) return { refused: refusals }
  return { act, said: held.said, recurrence: held.recurrence }
}

async function loggingIn(said: ReadonlyMap<string, string>): Promise<Answer> {
  const { clientId, clientSecret } = readGoogleOauthAppCredentials()
  await googleOauthConsent({
    scopes: [CALENDAR_OAUTH_SCOPE],
    clientId,
    clientSecret,
    tokenVar: REFRESH_TOKEN_VAR,
    callbackUrl: said.get(CALLBACK_URL),
  })
  return {
    report: [`consent was granted, and the round trip wrote \`${REFRESH_TOKEN_VAR}\` out itself`],
    refusals: [],
    code: 0,
  }
}

function inputOf(said: ReadonlyMap<string, string>, recurrence: readonly string[]): EventInput {
  return {
    calendarId: said.get(CALENDAR),
    summary: said.get(SUMMARY) ?? "",
    start: said.get(START) ?? "",
    end: said.get(END) ?? "",
    description: said.get(DESCRIPTION),
    location: said.get(LOCATION),
    attendees: emails(said.get(ATTENDEES)),
    timezone: said.get(TIMEZONE),
    recurrence: rules(recurrence),
    sendUpdates: narrowSendUpdates(said.get(SENDING)),
  }
}

function patchOf(said: ReadonlyMap<string, string>, recurrence: readonly string[]): EventPatch {
  return {
    calendarId: said.get(CALENDAR),
    eventId: said.get(EVENT) ?? "",
    summary: said.get(SUMMARY),
    start: said.get(START),
    end: said.get(END),
    description: said.get(DESCRIPTION),
    location: said.get(LOCATION),
    attendees: emails(said.get(ATTENDEES)),
    timezone: said.get(TIMEZONE),
    recurrence: rules(recurrence),
    sendUpdates: narrowSendUpdates(said.get(SENDING)),
  }
}

async function asAlan() {
  return await (await import("@akasha/google-calendar/client")).makeOAuthCalendarClient()
}

async function asAkasha() {
  return await (await import("@akasha/google-calendar/client")).makeCalendarClient()
}

async function acting(read: {
  readonly act: string
  readonly said: ReadonlyMap<string, string>
  readonly recurrence: readonly string[]
}): Promise<Answer> {
  const { act, said, recurrence } = read
  if (act === `${AUTH} ${LOGIN}`) return await loggingIn(said)
  const events = await import("@akasha/google-calendar/events")
  const answered = (value: unknown): Answer => ({ report: jsonSaid(value), refusals: [], code: 0 })
  if (act === `${EVENTS} ${LIST}`) {
    const max = said.get(MAX)
    return answered(
      await events.listEvents(await asAkasha(), {
        calendarId: said.get(CALENDAR),
        from: said.get(FROM),
        to: said.get(TO),
        query: said.get(QUERY),
        max: max === undefined ? undefined : (wholeNumber(max) ?? undefined),
      })
    )
  }
  const eventId = said.get(EVENT) ?? ""
  const calendarId = said.get(CALENDAR)
  if (act === `${EVENTS} ${GET}`) {
    return answered(await events.getEvent(await asAkasha(), { calendarId, eventId }))
  }
  if (act === `${EVENTS} ${DELETE}`) {
    return answered(await events.deleteEvent(await asAkasha(), { calendarId, eventId }))
  }
  if (act === `${EVENTS} ${CREATE}`) {
    return answered(await events.createEvent(await asAlan(), inputOf(said, recurrence)))
  }
  if (act === `${EVENTS} ${UPDATE}`) {
    return answered(await events.updateEvent(await asAlan(), patchOf(said, recurrence)))
  }
  return answered(
    await events.rsvpEvent(await asAlan(), {
      calendarId,
      eventId,
      status: (said.get(STATUS) ?? "accepted") as RsvpStatus,
      sendUpdates: narrowSendUpdates(said.get(SENDING)),
    })
  )
}

export async function calendar(argv: readonly string[], given: Given): Promise<Answer> {
  const read = readIn(argv)
  if ("refused" in read) return { report: [], refusals: read.refused, code: 1 }
  try {
    return await acting(read)
  } catch (thrown) {
    return {
      report: [],
      refusals: [`${given.calledAs} ${read.act} — ${whyOf(thrown)}`],
      code: exitCodeForThrowable(thrown),
    }
  }
}
