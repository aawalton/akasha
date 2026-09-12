import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { attachmentId } from "akasha/commands/arguments/pages/attachment-id.argument.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailAttachmentShow } from "akasha/commands/pages/email/attachment/show/email-attachment-show.command.code.ts"
import { emailAttachmentShow as page } from "akasha/commands/pages/email/attachment/show/email-attachment-show.command.ts"

const CALLED_AS = "akasha email attachment show"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const FETCHED: readonly Argument[] = [message, attachmentId]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(FETCHED, one.argument))

const NEEDED: readonly string[] = page.arguments
  .filter((one) => "required" in one && one.required === true)
  .map((one) => saidForPart(FETCHED, one.argument))

const PLACED = `<${message.placeholder}>`

const MESSAGE = "a-message-the-mailbox-gave-an-id"

const showRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailAttachmentShow(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SAYS.length).toBe(page.arguments.length)
  expect(SAYS).toEqual([message.said, attachmentId.said])
})

test("both arguments the page declares are needed, and one is said either way", () => {
  expect(NEEDED).toEqual([message.said, attachmentId.said])
  expect(page.arguments[0]?.saidAs).toBe("flag-or-word")
  expect(page.arguments[1]).not.toHaveProperty("saidAs")
})

test("a flag this takes nothing of is refused, naming the word among the flags", async () => {
  const said = (await showRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${PLACED}\`, \`${message.said}\`, \`${attachmentId.said}\``)
})

test("a call saying nothing asks for the message either way and for the attachment", async () => {
  const said = await showRefusing([])
  expect(said.length).toBe(NEEDED.length)
  expect(said[0]).toContain(`\`${PLACED}\` or \`${message.said}\``)
  expect(said[1]).toContain(`\`${attachmentId.said}\``)
})

test("the message said as a word and at its flag in one call is refused", async () => {
  const said = await showRefusing([MESSAGE, message.said, MESSAGE, attachmentId.said, "x"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
  expect(said[0]).toContain(`\`${message.said}\``)
})

test("a spare word is refused and the refusal names the word nothing takes", async () => {
  const said = await showRefusing([MESSAGE, "a-spare-word", attachmentId.said, "x"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("the attachment said twice is refused rather than the later one winning", async () => {
  const said = await showRefusing([MESSAGE, attachmentId.said, "x", attachmentId.said, "y"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${attachmentId.said}\``)
  expect(said[0]).toContain("twice")
})

test("the attachment with no value after it is refused, and asked for besides", async () => {
  const said = await showRefusing([MESSAGE, attachmentId.said])
  expect(said.length).toBe(2)
  expect(said[0]).toBe(`\`${attachmentId.said}\` takes a value, and none follows it`)
  expect(said[1]).toContain(`\`${attachmentId.said}\``)
})
