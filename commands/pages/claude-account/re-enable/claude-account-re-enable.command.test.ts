import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.test-fixtures.ts"
import { account } from "akasha/commands/arguments/pages/account.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { claudeAccountReEnable } from "akasha/commands/pages/claude-account/re-enable/claude-account-re-enable.command.code.ts"
import { claudeAccountReEnable as page } from "akasha/commands/pages/claude-account/re-enable/claude-account-re-enable.command.ts"

const CALLED_AS = "akasha claude-account re-enable"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [account]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const IN_PLACE = `<${account.placeholder}>`

const enablingRefused = (argv: readonly string[]): readonly string[] => {
  const answer = claudeAccountReEnable(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the account is the one argument the page names, and it is said as a word", () => {
  expect(SAYS).toEqual([account.said])
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("word")
})

test("a call naming no account asks for it by its placeholder rather than by a flag", () => {
  const said = enablingRefused([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).not.toContain(account.said)
})

test("a flag this takes no argument at is refused, and the account asked for besides", () => {
  const said = enablingRefused(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[1]).toContain(`\`${IN_PLACE}\``)
})

test("the account's own flag is refused, this taking the account as a word alone", () => {
  const said = enablingRefused([account.said, "an-account-a-page-is-filed-for"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${account.said}\``)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
})

test("one spare word is refused, and the refusal names the word nothing takes", () => {
  const said = enablingRefused(["one-account", "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two spare words are both named, drawn one beside the other", () => {
  const said = enablingRefused(["one-account", "one-spare", "two-spare"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare` or `two-spare`")
})

test("a word after a bare dash pair fills the account rather than being read as a flag", () => {
  const said = enablingRefused(["--", "--nope", "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})
