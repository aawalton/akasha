import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { contact } from "akasha/commands/arguments/pages/contact.argument.ts"
import { json } from "akasha/commands/arguments/pages/json.argument.ts"
import { limit } from "akasha/commands/arguments/pages/limit.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageRecentList } from "akasha/commands/pages/imessage/recent-list/imessage-recent-list.command.code.ts"
import { imessageRecentList as page } from "akasha/commands/pages/imessage/recent-list/imessage-recent-list.command.ts"

const CALLED_AS = "akasha imessage recent-list"

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

const recentRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await imessageRecentList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page names three arguments, each of them one a call may leave out", () => {
  expect(SAYS).toEqual([json.said, limit.said, contact.said])
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("a flag this takes no argument at is refused, naming every argument it takes", async () => {
  const said = await recentRefusing(["--nope"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(EVERY)
})

test("a word is refused here, where no argument this takes is said as a word", async () => {
  const said = await recentRefusing(["alan"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("`alan`")
  expect(said[0]).toContain(EVERY)
})

test("the count at its flag with nothing after it is refused", async () => {
  const said = await recentRefusing([limit.said])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said}\``)
  expect(said[0]).toContain("takes a value")
})

test("a count that is no whole number is refused for the value rather than as one nothing said", async () => {
  const said = await recentRefusing([limit.said, "many"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said} many\``)
  expect(said[0]).toContain("whole number")
})

test("the count said twice is refused rather than the later one winning", async () => {
  const said = await recentRefusing([limit.said, "5", limit.said, "6"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said}\``)
  expect(said[0]).toContain("twice")
})

test("a count of nought is refused rather than read as no count at all", async () => {
  const said = await recentRefusing([limit.said, "0"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${limit.said}\``)
  expect(said[0]).toContain("above zero")
})

test("the contact joined to an empty value is refused as the call wrote it", async () => {
  const said = await recentRefusing([`${contact.said}=`])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${contact.said}=\``)
})
