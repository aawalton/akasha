import { expect, test } from "bun:test"
import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { label } from "akasha/commands/arguments/pages/label.argument.ts"
import { mailQuery } from "akasha/commands/arguments/pages/mail-query.argument.ts"
import { max } from "akasha/commands/arguments/pages/max.argument.ts"
import { queryFile } from "akasha/commands/arguments/pages/query-file.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { emailMessageList } from "akasha/commands/pages/email/message/list/email-message-list.command.code.ts"
import { emailMessageList as page } from "akasha/commands/pages/email/message/list/email-message-list.command.ts"

const CALLED_AS = "akasha email message list"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const SEARCHED: readonly Argument[] = [queryFile, mailQuery, max, label]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(SEARCHED, one.argument))

const APART = page.arguments.find((one) => "notWith" in one)

const KEPT_FROM: readonly string[] =
  APART === undefined ? [] : APART.notWith.map((one) => saidForPart(SEARCHED, one))

const OVER_AGAIN: readonly string[] = page.arguments
  .filter((one) => "repeats" in one && one.repeats === true)
  .map((one) => saidForPart(SEARCHED, one.argument))

const NOWHERE = "/nowhere/no-such-search-file"

const listRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await emailMessageList(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("every argument the page declares is one this test carries the argument page for", () => {
  expect(SAYS.length).toBe(page.arguments.length)
  expect(SAYS).toEqual([queryFile.said, mailQuery.said, max.said, label.said])
})

test("the search is said at a flag shorter than its argument page is slugged", () => {
  expect(mailQuery.slug).toBe("mail-query")
  expect(mailQuery.said).toBe("--query")
})

test("the search in a file is kept apart from the search said inline", () => {
  expect(KEPT_FROM).toEqual([mailQuery.said])
})

test("a flag this takes nothing of is refused, naming every argument in the order declared", async () => {
  const said = (await listRefusing(["--nope"]))[0] ?? ""
  expect(said).toContain("--nope")
  expect(said).toContain(SAYS.join("`, `"))
})

test("nothing is required here, so a spare flag is the only refusal a call earns", async () => {
  expect(page.arguments.filter((one) => "required" in one).length).toBe(0)
  expect((await listRefusing(["--nope"])).length).toBe(1)
})

test("each argument the search file is kept from is refused where a call says both", async () => {
  for (const one of KEPT_FROM) {
    const said = await listRefusing([queryFile.said, NOWHERE, one, "in:inbox"])
    expect(said).toContain(
      `\`${queryFile.said}\` and \`${one}\` are never said together, and this call says both`
    )
  }
})

test("every argument the page marks repeating is taken more than once without refusal", async () => {
  const twice = OVER_AGAIN.flatMap((one) => [one, "INBOX", one, "UNREAD"])
  expect(twice.length).toBeGreaterThan(0)
  const said = await listRefusing([...twice, "--nope"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("--nope")
})

test("an argument the page does not mark repeating is refused where it is said twice", async () => {
  const said = await listRefusing([mailQuery.said, "one", mailQuery.said, "two"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${mailQuery.said}\``)
  expect(said[0]).toContain("twice")
})

test("the count takes a whole number, and a word that is none is refused", async () => {
  const said = await listRefusing([max.said, "lots"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`${max.said} lots`)
  expect(said[0]).toContain("whole number")
})

test("an argument carrying a value is refused where no value follows it", async () => {
  const said = await listRefusing([max.said])
  expect(said[0]).toBe(`\`${max.said}\` takes a value, and none follows it`)
})

test("a search file that would not open is refused after the arguments are taken", async () => {
  const said = await listRefusing([queryFile.said, NOWHERE])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(queryFile.said)
  expect(said[0]).toContain(NOWHERE)
  expect(said[0]).toContain("would not open")
})
