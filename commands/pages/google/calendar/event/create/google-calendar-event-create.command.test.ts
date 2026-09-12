import { expect, test } from "bun:test"
import { SEND_UPDATES } from "akasha/alan/google/calendar/send-updates-narrowing/send-updates-narrowing.module.code.ts"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { attendees } from "akasha/commands/arguments/pages/attendees.argument.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { description } from "akasha/commands/arguments/pages/description.argument.ts"
import { end } from "akasha/commands/arguments/pages/end.argument.ts"
import { location } from "akasha/commands/arguments/pages/location.argument.ts"
import { recurrence } from "akasha/commands/arguments/pages/recurrence.argument.ts"
import { sendUpdates } from "akasha/commands/arguments/pages/send-updates.argument.ts"
import { start } from "akasha/commands/arguments/pages/start.argument.ts"
import { summary } from "akasha/commands/arguments/pages/summary.argument.ts"
import { timezone } from "akasha/commands/arguments/pages/timezone.argument.ts"
import { SENDING } from "akasha/commands/modules/calendar-eventing/calendar-eventing.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { googleCalendarEventCreate } from "akasha/commands/pages/google/calendar/event/create/google-calendar-event-create.command.code.ts"
import { googleCalendarEventCreate as page } from "akasha/commands/pages/google/calendar/event/create/google-calendar-event-create.command.ts"

const CALLED_AS = "akasha google calendar event create"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [
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

type Declared = { readonly said: string; readonly required: boolean; readonly repeats: boolean }

const DECLARED: readonly Declared[] = page.arguments.map((one) => {
  const held = PAGES.find((each) => each.slug === one.argument.slice(PART.length))
  if (held === undefined) {
    throw new Error(`\`${one.argument}\` is declared and no page here is named for it`)
  }
  return {
    said: held.said,
    required: "required" in one && one.required === true,
    repeats: "repeats" in one && one.repeats === true,
  }
})

const REQUIRED = DECLARED.filter((one) => one.required)

const WHEN = [summary.said, "a title", start.said, "2026-01-01", end.said, "2026-01-02"]

const NOT_A_SENDING = "nobody-at-all"

const POISON = [sendUpdates.said, NOT_A_SENDING]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await googleCalendarEventCreate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([summary.said, start.said, end.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(DECLARED.map((one) => one.said).join("`, `"))
})

test("a call saying nothing asks by name for each argument the page requires", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(REQUIRED.length)
  for (const one of REQUIRED) {
    expect(said.some((each) => each.includes(`\`${one.said}\``))).toBe(true)
  }
})

test("no argument the page leaves optional is asked for", async () => {
  const said = (await refusalsOf([])).join("\n")
  for (const one of DECLARED.filter((each) => !each.required)) {
    expect(said).not.toContain(one.said)
  }
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([...WHEN, summary.said, "another title"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${summary.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const repeated = DECLARED.filter((one) => one.repeats).flatMap((one) => [
    one.said,
    "FREQ=DAILY",
    one.said,
    "FREQ=WEEKLY",
  ])
  const said = await refusalsOf([...WHEN, ...repeated, ...POISON])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(NOT_A_SENDING)
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([summary.said])
  expect(said[0]).toBe(`\`${summary.said}\` takes a value, and none follows it`)
})

test("a sending nobody is named by is refused before the calendar is reached", async () => {
  const said = await refusalsOf([...WHEN, ...POISON])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${SENDING}\``)
  expect(said[0]).toContain(NOT_A_SENDING)
  for (const one of SEND_UPDATES) expect(said[0]).toContain(one)
})

test("every sending the calendar knows is taken rather than refused", async () => {
  for (const one of SEND_UPDATES) {
    const said = await refusalsOf([...WHEN, sendUpdates.said, one, "--nope"])
    expect(said.length).toBe(1)
    expect(said[0]).toContain("--nope")
  }
})
