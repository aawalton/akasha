import { expect, test } from "bun:test"
import type { RsvpStatus } from "akasha/alan/google/calendar/modules/calendar-event-shapes/calendar-event-shapes.module.code.ts"
import { SEND_UPDATES } from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import { sendUpdates } from "akasha/commands/arguments/pages/send-updates.argument.ts"
import { status } from "akasha/commands/arguments/pages/status.argument.ts"
import {
  SENDING,
  STATUS,
} from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { googleCalendarEventRsvp } from "akasha/commands/pages/google/calendar/event/rsvp/google-calendar-event-rsvp.command.code.ts"
import { googleCalendarEventRsvp as page } from "akasha/commands/pages/google/calendar/event/rsvp/google-calendar-event-rsvp.command.ts"

const CALLED_AS = "akasha google calendar event rsvp"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [event, calendar, sendUpdates, status]

type Declared = { readonly spellings: readonly string[]; readonly required: boolean }

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const held = PAGES.find((each) => each.slug === one.argument.slice(PART.length))
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared and no page here is named for it`)
  }
  const saidAs: string = "saidAs" in one ? one.saidAs : "flag"
  const spellings = [
    ...(saidAs === "flag" ? [] : [`<${held.placeholder ?? held.slug}>`]),
    ...(saidAs === "word" ? [] : [held.said]),
  ]
  return { spellings, required: "required" in one && one.required === true }
})

const SPELLINGS = DECLARED.flatMap((one) => one.spellings)

const WORD = `<${event.placeholder}>`

const ID = "an-event-the-calendar-gave-an-id"

const STATUSES: readonly RsvpStatus[] = ["accepted", "declined", "tentative"]

const NOT_A_STATUS = "thinking-about-it"

const NOT_A_SENDING = "nobody-at-all"

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await googleCalendarEventRsvp(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(DECLARED.filter((one) => one.required).length).toBe(2)
})

test("a flag this takes nothing of is refused, naming every spelling in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLINGS.join("`, `"))
})

test("a call saying nothing asks for the event either way and for the status", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${WORD}\` or \`${event.said}\``)
  expect(said[1]).toContain(`\`${status.said}\``)
})

test("the event said as a word and at its flag in one call is refused", async () => {
  const said = await refusalsOf([ID, event.said, ID, status.said, "accepted"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\``)
  expect(said[0]).toContain(`\`${event.said}\``)
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([ID, status.said])
  expect(said).toContain(`\`${status.said}\` takes a value, and none follows it`)
})

test("a response nobody gives is refused before the calendar is reached", async () => {
  const said = await refusalsOf([ID, status.said, NOT_A_STATUS])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${STATUS}\``)
  expect(said[0]).toContain(NOT_A_STATUS)
  for (const one of STATUSES) expect(said[0]).toContain(one)
})

test("a sending nobody is named by is refused before the calendar is reached", async () => {
  const said = await refusalsOf([ID, status.said, "accepted", sendUpdates.said, NOT_A_SENDING])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${SENDING}\``)
  expect(said[0]).toContain(NOT_A_SENDING)
  for (const one of SEND_UPDATES) expect(said[0]).toContain(one)
})

test("a response and a sending both unknown are each refused on a line of their own", async () => {
  const said = await refusalsOf([ID, status.said, NOT_A_STATUS, sendUpdates.said, NOT_A_SENDING])
  expect(said.length).toBe(2)
  expect(said[0]).toContain(NOT_A_STATUS)
  expect(said[1]).toContain(NOT_A_SENDING)
})

test("every response the calendar takes is read rather than refused", async () => {
  for (const one of STATUSES) {
    const said = await refusalsOf([ID, status.said, one, "--nope"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("--nope")
  }
})
