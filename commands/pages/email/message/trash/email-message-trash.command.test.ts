import { expect, test } from "bun:test"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailMessageTrash } from "akasha/commands/pages/email/message/trash/email-message-trash.command.code.ts"
import { emailMessageTrash as page } from "akasha/commands/pages/email/message/trash/email-message-trash.command.ts"

const CALLED_AS = "akasha email message trash"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ONLY = page.arguments[0]

const AS_WORD = `<${message.placeholder}>`

const AT_FLAG = message.said

const ID = "a-message-the-mailbox-gave-an-id"

const SPARE = "a-second-id-no-call-here-takes"

const refusalsOf = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailMessageTrash(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the message, needed and said either way", () => {
  expect(page.arguments.length).toBe(1)
  expect(ONLY?.argument).toBe(`argument/${message.slug}`)
  expect(ONLY?.required).toBe(true)
  expect(ONLY?.saidAs).toBe("flag-or-word")
})

test("a flag this takes nothing of is refused, naming the word and the flag it does take", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${AS_WORD}\`, \`${AT_FLAG}\``)
})

test("a call naming no message asks for it as a word or at its flag", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${AS_WORD}\` or \`${AT_FLAG}\``)
})

test("one call says the message one way, so saying it both ways is refused", async () => {
  const said = await refusalsOf([ID, AT_FLAG, ID])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${AS_WORD}\``)
  expect(said[0]).toContain(`\`${AT_FLAG}\``)
})

test("a spare word is refused and the refusal counts the words either side", async () => {
  const said = await refusalsOf([ID, SPARE])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
})

test("the message at its flag with no value after it is refused", async () => {
  const said = await refusalsOf([AT_FLAG])
  expect(said).toContain(`\`${AT_FLAG}\` takes a value, and none follows it`)
})

test("the message joined to an empty value is refused rather than read as nothing", async () => {
  const said = await refusalsOf([`${AT_FLAG}=`])
  expect(said[0]).toContain(`${AT_FLAG}=`)
})
