import { expect, test } from "bun:test"
import { saidForPart } from "akasha/command/argument/modules/taking/argument-taking.module.test-fixtures.ts"
import { account } from "akasha/command/argument/pages/account.argument.ts"
import { INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import { modelAccountDisable } from "akasha/command/pages/model-account/disable/model-account-disable.command.code.ts"
import { modelAccountDisable as page } from "akasha/command/pages/model-account/disable/model-account-disable.command.ts"

const CALLED_AS = "akasha model-account disable"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const PAGES = [account]

const SAYS: readonly string[] = page.arguments.map((one) => saidForPart(PAGES, one.argument))

const IN_PLACE = `<${account.placeholder}>`

const disablingRefused = (argv: readonly string[]): readonly string[] => {
  const answer = modelAccountDisable(argv, GIVEN)
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
  const said = disablingRefused([])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[0]).not.toContain(account.said)
})

test("a flag this takes no argument at is refused, and the account asked for besides", () => {
  const said = disablingRefused(["--nope"])

  expect(said.length).toBe(2)
  expect(said[0]).toContain("`--nope`")
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
  expect(said[1]).toContain(`\`${IN_PLACE}\``)
})

test("the account's own flag is refused, this taking the account as a word alone", () => {
  const said = disablingRefused([account.said, "an-account-a-page-is-filed-for"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${account.said}\``)
  expect(said[0]).toContain(`\`${IN_PLACE}\``)
})

test("one spare word is refused, and the refusal names the word nothing takes", () => {
  const said = disablingRefused(["one-account", "a-spare-word"])

  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("2 words")
  expect(said[0]).toContain("`a-spare-word`")
})

test("an account no page is filed for is refused as a fault of the data", () => {
  const answer = modelAccountDisable(["an-account-no-page-is-filed-for"], GIVEN)

  expect(answer.refusals.length).toBe(1)
  expect(answer.refusals[0]).toContain("an-account-no-page-is-filed-for")
})

test("no reason is worded by a caller, this command wording the one it writes", () => {
  expect(page.arguments.length).toBe(1)
})
