import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { contact } from "akasha/commands/arguments/pages/contact.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit } from "akasha/commands/arguments/pages/limit.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageUnreadList } from "akasha/commands/pages/imessage/unread-list/imessage-unread-list.command.code.ts"
import { imessageUnreadList as page } from "akasha/commands/pages/imessage/unread-list/imessage-unread-list.command.ts"

const CALLED_AS = "akasha imessage unread-list"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: CALLED_AS,
  from: "/nowhere",
  writer: null,
  agentId: null,
}

const PAGES = [json, limit, contact]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const EVERY = `\`${SAYS.join("`, `")}\``

const PAST_THE_LARGEST = "9007199254740992"

const unreadRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await imessageUnreadList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names the same three arguments its sibling names, none of them needed", () => {
  expect(SAYS).toEqual([json.said, limit.said, contact.said])
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes no argument at is refused, naming every argument it takes", async () => {
  const said = await unreadRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
})

test("two words are two refusals, each naming the word nothing here takes", async () => {
  const said = await unreadRefusing(["alan", "beth"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`alan`")
  expect(said[1]).toContain("`beth`")
})

test("the JSON flag written with an equals is refused, carrying no value of its own", async () => {
  const said = await unreadRefusing([`${json.said}=true`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${json.said}\``)
  expect(said[0]).toContain(`\`${json.said}=true\``)
})

test("a count past the largest whole number that can be read is refused rather than read", async () => {
  const said = await unreadRefusing([limit.said, PAST_THE_LARGEST])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said} ${PAST_THE_LARGEST}\``)
  expect(said[0]).toContain("largest whole number")
})

test("the empty word after the count names no value", async () => {
  const said = await unreadRefusing([limit.said, ""])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said}\``)
  expect(said[0]).toContain("empty word")
})

test("the contact said twice is refused rather than the later one winning", async () => {
  const said = await unreadRefusing([contact.said, "alan", contact.said, "beth"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${contact.said}\``)
  expect(said[0]).toContain("twice")
})

test("a count of nought is refused rather than read as every unread message", async () => {
  const said = await unreadRefusing([limit.said, "0"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said}\``)
  expect(said[0]).toContain("above zero")
})
