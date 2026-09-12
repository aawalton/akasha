import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailAttachmentList } from "akasha/commands/pages/email/attachment/list/email-attachment-list.command.code.ts"
import { emailAttachmentList as page } from "akasha/commands/pages/email/attachment/list/email-attachment-list.command.ts"

const CALLED_AS = "akasha email attachment list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const STATED = page.arguments[0]

const FLAGGED = saidForPart([message], STATED?.argument ?? "")

const WORDED = `<${message.placeholder}>`

const WALKED = "a-message-the-mailbox-gave-an-id"

const attachmentsRefused = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailAttachmentList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the message, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(FLAGGED).toBe(message.said)
  expect(STATED?.required).toBe(true)
  expect(STATED?.saidAs).toBe("flag-or-word")
})

test("a call naming no message asks for it as a word or at its flag", async () => {
  const said = await attachmentsRefused([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORDED}\` or \`${FLAGGED}\``)
})

test("a flag this takes nothing of is refused, naming the word among the flags", async () => {
  const said = await attachmentsRefused(["--nope"])
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${WORDED}\`, \`${FLAGGED}\``)
})

test("a call saying the message both ways is refused rather than one way winning", async () => {
  const said = await attachmentsRefused([WALKED, FLAGGED, WALKED])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${WORDED}\``)
  expect(said[0]).toContain(`\`${FLAGGED}\``)
})

test("one spare word is counted against the one word this takes and named", async () => {
  const said = await attachmentsRefused([WALKED, "one-too-many"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`one-too-many`")
})

test("two spare words are both named, drawn from what the call carried", async () => {
  const said = await attachmentsRefused([WALKED, "spare-one", "spare-two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`spare-one`")
  expect(said[0]).toContain("`spare-two`")
})

test("the message at its flag with no value after it is refused, and asked for besides", async () => {
  const said = await attachmentsRefused([FLAGGED])
  expect(said.length).toBe(2)
  expect(said[0]).toBe(`\`${FLAGGED}\` takes a value, and none follows it`)
})

test("the message joined to an empty value is refused rather than read as nothing", async () => {
  const said = await attachmentsRefused([`${FLAGGED}=`])
  expect(said[0]).toContain(`${FLAGGED}=`)
})
