import { expect, test } from "bun:test"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailUnsubscribe } from "akasha/commands/pages/email/unsubscribe/email-unsubscribe.command.code.ts"
import { emailUnsubscribe as page } from "akasha/commands/pages/email/unsubscribe/email-unsubscribe.command.ts"

const CALLED_AS = "akasha email unsubscribe"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const WORD = `<${message.placeholder}>`

const ID = "a-message-the-mailbox-gave-an-id"

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await emailUnsubscribe(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the one argument the page declares is the message, needed and said either way", () => {
  expect(page.arguments.length).toBe(1)
  expect(page.arguments[0]?.argument).toBe(`argument/${message.slug}`)
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("flag-or-word")
})

test("a flag this takes nothing of is refused, naming both spellings of the one it takes", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${WORD}\`, \`${message.said}\``)
})

test("a call naming no message asks for it under both spellings", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\` or \`${message.said}\``)
})

test("the message said as a word and at its flag in one call is refused", async () => {
  const said = await refusalsOf([ID, message.said, ID])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORD}\``)
  expect(said[0]).toContain(`\`${message.said}\``)
})

test("a second word is refused against the one word this takes", async () => {
  const said = await refusalsOf([ID, "another"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
})

test("the message at its flag with no value after it is refused", async () => {
  const said = await refusalsOf([message.said])
  expect(said[0]).toBe(`\`${message.said}\` takes a value, and none follows it`)
})
