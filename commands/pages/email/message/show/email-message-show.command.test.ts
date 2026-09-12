import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailMessageShow } from "akasha/commands/pages/email/message/show/email-message-show.command.code.ts"
import { emailMessageShow as page } from "akasha/commands/pages/email/message/show/email-message-show.command.ts"

const CALLED_AS = "akasha email message show"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ENTRY = page.arguments[0]

const AT_FLAG = saidForPart([message], ENTRY?.argument ?? "")

const IN_PLACE = `<${message.placeholder}>`

const FETCHED = "a-message-the-mailbox-gave-an-id"

const ASKED = `\`${IN_PLACE}\` or \`${AT_FLAG}\``

const showingRefused = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailMessageShow(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the message, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(AT_FLAG).toBe(message.said)
  expect(ENTRY?.required).toBe(true)
  expect(ENTRY?.saidAs).toBe("flag-or-word")
})

test("a call naming no message asks for it as a word or at its flag", async () => {
  const said = await showingRefused([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(ASKED)
})

test("a flag this takes nothing of is refused, and the message is asked for besides", async () => {
  const said = await showingRefused(["--nope"])
  expect(said.length).toBe(2)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${IN_PLACE}\`, \`${AT_FLAG}\``)
  expect(said[1]).toContain(ASKED)
})

test("a call saying the message both ways is refused rather than one way winning", async () => {
  const said = await showingRefused([FETCHED, AT_FLAG, FETCHED])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).toContain(`\`${AT_FLAG}\``)
})

test("a spare word is refused and the refusal names the word nothing takes", async () => {
  const said = await showingRefused([FETCHED, "a-spare-word"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("the message at its flag with no value after it is refused, and asked for besides", async () => {
  const said = await showingRefused([AT_FLAG])
  expect(said.length).toBe(2)
  expect(said[0]).toBe(`\`${AT_FLAG}\` takes a value, and none follows it`)
  expect(said[1]).toContain(ASKED)
})

test("the message joined to an empty value is refused, and asked for besides", async () => {
  const said = await showingRefused([`${AT_FLAG}=`])
  expect(said.length).toBe(2)
  expect(said[0]).toContain(`${AT_FLAG}=`)
  expect(said[1]).toContain(ASKED)
})
