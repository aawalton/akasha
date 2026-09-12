import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { message } from "akasha/commands/arguments/pages/message.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailMessageArchive } from "akasha/commands/pages/email/message/archive/email-message-archive.command.code.ts"
import { emailMessageArchive as page } from "akasha/commands/pages/email/message/archive/email-message-archive.command.ts"

const CALLED_AS = "akasha email message archive"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const FLAG = saidForPart([message], page.arguments[0]?.argument ?? "")

const PLACED = `<${message.placeholder}>`

const LABELLED = "a-message-the-mailbox-gave-an-id"

const archiveRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailMessageArchive(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the message, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(FLAG).toBe(message.said)
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("flag-or-word")
})

test("a flag this takes nothing of is refused, naming the word and the flag it does take", async () => {
  const said = (await archiveRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(`\`${PLACED}\`, \`${FLAG}\``)
})

test("a call naming no message asks for it as a word or at its flag", async () => {
  const said = await archiveRefusing([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\` or \`${FLAG}\``)
})

test("a call saying the message both ways is refused rather than one way winning", async () => {
  const said = await archiveRefusing([LABELLED, FLAG, LABELLED])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
  expect(said[0]).toContain(`\`${FLAG}\``)
})

test("a spare word is refused and the refusal names the word nothing takes", async () => {
  const said = await archiveRefusing([LABELLED, "a-spare-word"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("a flag following the message is no value for it, and each is refused on its own", async () => {
  const said = await archiveRefusing([FLAG, "--nope"])
  expect(said.length).toBe(3)
  expect(said[0]).toBe(`\`${FLAG}\` takes a value, and none follows it`)
  expect(said[1]).toContain("--nope")
  expect(said[2]).toContain(`\`${PLACED}\` or \`${FLAG}\``)
})

test("the message joined to an empty value is refused rather than read as nothing", async () => {
  const said = await archiveRefusing([`${FLAG}=`])
  expect(said[0]).toContain(`${FLAG}=`)
})
