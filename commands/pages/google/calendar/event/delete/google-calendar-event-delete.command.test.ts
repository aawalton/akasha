import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { calendar } from "akasha/commands/arguments/pages/calendar.argument.ts"
import { event } from "akasha/commands/arguments/pages/event.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { googleCalendarEventDelete } from "akasha/commands/pages/google/calendar/event/delete/google-calendar-event-delete.command.code.ts"
import { googleCalendarEventDelete as page } from "akasha/commands/pages/google/calendar/event/delete/google-calendar-event-delete.command.ts"

const CALLED_AS = "akasha google calendar event delete"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PART = "argument/"

const PAGES: readonly Argument[] = [event, calendar]

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

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await googleCalendarEventDelete(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(DECLARED.filter((one) => one.required).map((one) => one.spellings)).toEqual([
    [WORD, event.said],
  ])
})

test("a flag this takes nothing of is refused, naming every spelling in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SPELLINGS.join("`, `"))
})

test("a call naming no event asks for it under both spellings and nothing else", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\` or \`${event.said}\``)
  expect(said[0]).not.toContain(calendar.said)
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

test("the event at its flag with no value after it is refused", async () => {
  const said = await refusalsOf([event.said])
  expect(said[0]).toBe(`\`${event.said}\` takes a value, and none follows it`)
})

test("the calendar said twice is refused rather than taken once", async () => {
  const said = await refusalsOf([ID, calendar.said, "one", calendar.said, "two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${calendar.said}\``)
  expect(said[0]).toContain("twice")
})
