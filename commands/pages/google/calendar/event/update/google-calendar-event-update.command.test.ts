import { expect, test } from "bun:test"
import { SEND_UPDATES } from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { attendees } from "akasha/commands/arguments/pages/attendees.argument.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { description } from "akasha/commands/arguments/pages/description.argument.ts"
import { end } from "akasha/commands/arguments/pages/end.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import { location } from "akasha/commands/arguments/pages/location.argument.ts"
import { recurrence } from "akasha/commands/arguments/pages/recurrence.argument.ts"
import { sendUpdates } from "akasha/commands/arguments/pages/send-updates.argument.ts"
import { start } from "akasha/commands/arguments/pages/start.argument.ts"
import { summary } from "akasha/commands/arguments/pages/summary.argument.ts"
import { timezone } from "akasha/commands/arguments/pages/timezone.argument.ts"
import { SENDING } from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { googleCalendarEventUpdate } from "akasha/commands/pages/google/calendar/event/update/google-calendar-event-update.command.code.ts"
import { googleCalendarEventUpdate as page } from "akasha/commands/pages/google/calendar/event/update/google-calendar-event-update.command.ts"

const CALLED_AS = "akasha google calendar event update"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [
  event,
  calendar,
  sendUpdates,
  summary,
  start,
  end,
  description,
  location,
  attendees,
  timezone,
  recurrence,
]

type Declared = {
  readonly spellings: readonly string[]
  readonly required: boolean
  readonly repeats: boolean
}

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const held = PAGES.find((each) => each.slug === one.argument.slice(PART.length))
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared and no page here is named for it`)
  }
  const saidAs: string = "saidAs" in one ? one.saidAs : "flag"
  const asWord = saidAs === "word" || saidAs === "flag-or-word"
  const spellings = [
    ...(asWord ? [`<${held.placeholder ?? held.slug}>`] : []),
    ...(saidAs === "word" ? [] : [held.said]),
  ]
  return {
    spellings,
    required: "required" in one && one.required === true,
    repeats: "repeats" in one && one.repeats === true,
  }
})

const REQUIRED = DECLARED.filter((one) => one.required)

const SPELLINGS = DECLARED.flatMap((one) => one.spellings)

const WORD = `<${event.placeholder}>`

const ID = "an-event-the-calendar-gave-an-id"

const NOT_A_SENDING = "nobody-at-all"

const POISON = [sendUpdates.said, NOT_A_SENDING]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await googleCalendarEventUpdate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.length).toBe(1)
})

test("the argument said either way is offered under both of its spellings", () => {
  expect(REQUIRED[0]?.spellings).toEqual([WORD, event.said])
})

test("a flag this takes nothing of is refused, naming every spelling in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLINGS.join("`, `"))
})

test("a call saying nothing asks for the event under both spellings", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\` or \`${event.said}\``)
})

test("the event said as a word and at its flag in one call is refused", async () => {
  const said = await refusalsOf([ID, event.said, ID])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\``)
  expect(said[0]).toContain(`\`${event.said}\``)
})

test("a second word is refused against the one word this takes", async () => {
  const said = await refusalsOf([ID, "another"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([ID, summary.said, "one", summary.said, "two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${summary.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const repeated = DECLARED.filter((one) => one.repeats).flatMap((one) => [
    ...one.spellings.slice(-1),
    "FREQ=DAILY",
    ...one.spellings.slice(-1),
    "FREQ=WEEKLY",
  ])
  const said = await refusalsOf([ID, ...repeated, ...POISON])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_A_SENDING)
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([ID, summary.said])
  expect(said[0]).toBe(`\`${summary.said}\` takes a value, and none follows it`)
})

test("a sending nobody is named by is refused before the calendar is reached", async () => {
  const said = await refusalsOf([ID, ...POISON])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${SENDING}\``)
  expect(said[0]).toContain(NOT_A_SENDING)
  for (const one of SEND_UPDATES) expect(said[0]).toContain(one)
})

test("every sending the calendar knows is taken rather than refused", async () => {
  for (const one of SEND_UPDATES) {
    const said = await refusalsOf([ID, sendUpdates.said, one, "--nope"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("--nope")
  }
})
