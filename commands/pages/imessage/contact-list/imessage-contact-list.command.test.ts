import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { contactQuery } from "akasha/commands/arguments/pages/contact-query.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageContactList } from "akasha/commands/pages/imessage/contact-list/imessage-contact-list.command.code.ts"
import { imessageContactList as page } from "akasha/commands/pages/imessage/contact-list/imessage-contact-list.command.ts"

const CALLED_AS = "akasha imessage contact-list"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PAGES = [json, contactQuery]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const IN_PLACE = `<${contactQuery.placeholder}>`

const EVERY = `\`${json.said}\`, \`${IN_PLACE}\`, \`${contactQuery.said}\``

const ASKED = `\`${IN_PLACE}\` or \`${contactQuery.said}\``

const NAME = "alan"

const listRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await imessageContactList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the run of letters and the JSON flag, spelled as their pages spell them", () => {
  expect(SAYS).toEqual([json.said, contactQuery.said])
  expect(page.arguments[1]?.required).toBe(true)
  expect(page.arguments[1]?.saidAs).toBe("flag-or-word")
})

test("a call naming no run of letters asks for it as a word or at its flag", async () => {
  const said = await listRefusing([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASKED)
})

test("a flag this takes no argument at is refused, naming the placeholder among the flags", async () => {
  const said = await listRefusing(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
  expect(said[1]).toContain(ASKED)
})

test("the run of letters said as a word and at its flag in one call is refused", async () => {
  const said = await listRefusing([NAME, contactQuery.said, NAME])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).toContain(`\`${contactQuery.said}\``)
})

test("one spare word is refused, and the refusal names the word nothing takes", async () => {
  const said = await listRefusing([NAME, "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two spare words are both named, drawn one beside the other", async () => {
  const said = await listRefusing([NAME, "one-spare", "two-spare"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare` or `two-spare`")
})

test("the run of letters at its flag with nothing after it is refused, and asked for besides", async () => {
  const said = await listRefusing([contactQuery.said])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${contactQuery.said}\``)
  expect(said[0]).toContain("takes a value")
  expect(said[1]).toContain(ASKED)
})

test("the JSON flag written with an equals is refused, carrying no value of its own", async () => {
  const said = await listRefusing([`${json.said}=true`])

  expect(said.length).toBe(2)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain(`\`${json.said}=true\``)
  expect(said[1]).toContain(ASKED)
})
