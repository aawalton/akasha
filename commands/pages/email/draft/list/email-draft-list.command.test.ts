import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { max } from "akasha/commands/arguments/pages/max.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailDraftList } from "akasha/commands/pages/email/draft/list/email-draft-list.command.code.ts"
import { emailDraftList as page } from "akasha/commands/pages/email/draft/list/email-draft-list.command.ts"

const CALLED_AS = "akasha email draft list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const COUNT = saidForPart([max], page.arguments[0]?.argument ?? "")

const draftsRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailDraftList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, a count, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(COUNT).toBe(max.said)
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
})

test("the count is taken at a flag alone, never as a word in place", async () => {
  expect(page.arguments.filter((one) => "saidAs" in one).length).toBe(0)
  const said = await draftsRefusing(["5"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("`5`")
  expect(said[0]).toContain(`\`${COUNT}\``)
})

test("a flag this takes nothing of is refused, naming the one argument it does take", async () => {
  const said = await draftsRefusing(["--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
  expect(said[0]).toContain(`\`${COUNT}\``)
})

test("the count takes a whole number, and a word that is none is refused", async () => {
  const said = await draftsRefusing([COUNT, "lots"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${COUNT} lots`)
  expect(said[0]).toContain("whole number")
})

test("a count past the largest whole number that can be read is refused rather than rounded", async () => {
  const said = await draftsRefusing([COUNT, "99999999999999999999"])
  expect(said[0]).toContain("largest whole number")
})

test("the count with no value after it is refused", async () => {
  const said = await draftsRefusing([COUNT])
  expect(said[0]).toBe(`\`${COUNT}\` takes a value, and none follows it`)
})

test("the count joined to an empty value is refused rather than read as nothing", async () => {
  const said = await draftsRefusing([`${COUNT}=`])
  expect(said[0]).toContain(`${COUNT}=`)
})

test("the count said twice is refused, and one call says it once", async () => {
  const said = await draftsRefusing([COUNT, "1", COUNT, "2"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("twice")
})
