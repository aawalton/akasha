import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { attach } from "akasha/commands/arguments/pages/attach.argument.ts"
import { bcc } from "akasha/commands/arguments/pages/bcc.argument.ts"
import { body } from "akasha/commands/arguments/pages/body.argument.ts"
import { bodyFile } from "akasha/commands/arguments/pages/body-file.argument.ts"
import { cc } from "akasha/commands/arguments/pages/cc.argument.ts"
import { replyToMessage } from "akasha/commands/arguments/pages/reply-to-message.argument.ts"
import { sendAs } from "akasha/commands/arguments/pages/send-as.argument.ts"
import { subject } from "akasha/commands/arguments/pages/subject.argument.ts"
import { subjectFile } from "akasha/commands/arguments/pages/subject-file.argument.ts"
import { thread } from "akasha/commands/arguments/pages/thread.argument.ts"
import { toAddress } from "akasha/commands/arguments/pages/to-address.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailDraftCreate } from "akasha/commands/pages/email/draft/create/email-draft-create.command.code.ts"
import { emailDraftCreate as page } from "akasha/commands/pages/email/draft/create/email-draft-create.command.ts"

const CALLED_AS = "akasha email draft create"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES: readonly Argument[] = [
  toAddress,
  subjectFile,
  bodyFile,
  subject,
  body,
  thread,
  replyToMessage,
  sendAs,
  cc,
  bcc,
  attach,
]

type Declared = {
  readonly said: string
  readonly required: boolean
  readonly repeats: boolean
  readonly notWith: readonly string[]
  readonly oneOf: readonly string[]
}

const DECLARED: readonly Declared[] = page.arguments.map((one) => ({
  said: saidForPart(PAGES, one.argument),
  required: "required" in one && one.required === true,
  repeats: "repeats" in one && one.repeats === true,
  notWith: ("notWith" in one ? one.notWith : []).map((each) => saidForPart(PAGES, each)),
  oneOf: ("oneOf" in one ? one.oneOf : []).map((each) => saidForPart(PAGES, each)),
}))

const REQUIRED = DECLARED.filter((one) => one.required)

const PAIRED = DECLARED.filter((one) => one.notWith.length > 0)

const SUBJECT = [subject.said, "a subject"]

const BODY = [body.said, "a body"]

const TO = [toAddress.said, "someone@example.test"]

async function refusalsOf(argv: readonly string[]): Promise<readonly string[]> {
  const answer = await emailDraftCreate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(DECLARED.length).toBe(page.arguments.length)
  expect(REQUIRED.map((one) => one.said)).toEqual([toAddress.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await refusalsOf(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(DECLARED.map((one) => one.said).join("`, `"))
})

test("a call saying nothing asks for what is required and for each group, one line each", async () => {
  const said = await refusalsOf([])
  expect(said.length).toBe(1 + PAIRED.length)
  expect(said[0]).toContain(`\`${toAddress.said}\``)
})

test("each group of two names both ways of saying it where neither is said", async () => {
  const said = (await refusalsOf([])).join("\n")
  for (const one of PAIRED) {
    expect(said).toContain(`\`${one.said}\` or \`${one.oneOf.join("` or `")}\``)
  }
})

test("each pair the page keeps apart is refused where a call says both", async () => {
  for (const one of PAIRED) {
    const said = await refusalsOf([...TO, one.said, "x", ...one.notWith.flatMap((e) => [e, "y"])])
    expect(said).toContain(
      `\`${one.said}\` and \`${one.notWith.join("` and `")}\` are never said together, and this call says both`
    )
  }
})

test("a group is satisfied by either member, so only the other group is asked for", async () => {
  const said = await refusalsOf([...TO, ...SUBJECT])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${body.said}\``)
  expect(said[0]).not.toContain(`\`${subject.said}\``)
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await refusalsOf([...TO, ...SUBJECT, subject.said, "another", ...BODY])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${subject.said}\``)
  expect(said[0]).toContain("twice")
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const repeated = DECLARED.filter((one) => one.repeats).flatMap((one) => [
    one.said,
    "one",
    one.said,
    "two",
  ])
  const said = await refusalsOf([...TO, ...SUBJECT, ...repeated])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${body.said}\``)
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await refusalsOf([...SUBJECT, ...BODY, toAddress.said])
  expect(said[0]).toBe(`\`${toAddress.said}\` takes a value, and none follows it`)
})

test("no refusal here reaches a mailbox, so the arguments are weighed before any draft", async () => {
  const said = await refusalsOf(["--nope", ...TO, ...SUBJECT, ...BODY])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})
