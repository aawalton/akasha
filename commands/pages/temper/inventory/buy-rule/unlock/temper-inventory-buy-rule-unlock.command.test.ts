import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { temperInventoryBuyRuleUnlock } from "akasha/commands/pages/temper/inventory/buy-rule/unlock/temper-inventory-buy-rule-unlock.command.code.ts"
import { temperInventoryBuyRuleUnlock as page } from "akasha/commands/pages/temper/inventory/buy-rule/unlock/temper-inventory-buy-rule-unlock.command.ts"

const CALLED_AS = "akasha temper inventory buy-rule unlock"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const FLAG = saidForPart([buyRuleId], page.arguments[0]?.argument ?? "")

const PLACED = `<${buyRuleId.placeholder}>`

const unlockRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryBuyRuleUnlock(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the buy rule id, and this test carries its page", () => {
  expect(page.arguments.length).toBe(1)
  expect(FLAG).toBe(buyRuleId.said)
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("word")
})

test("a call naming no id asks for it by the placeholder its page carries", async () => {
  const said = await unlockRefusals([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("saying the id at its flag is refused, since this takes it as a word", async () => {
  const said = await unlockRefusals([FLAG, "a-rule-the-settings-hold"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(FLAG)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("a `--` makes the word after it the id rather than a flag this takes none of", async () => {
  const said = await unlockRefusals(["--", FLAG, "a-spare-word"])
  expect(said.length).toBe(1)
  expect(said[0]).not.toContain("is no argument")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two words nothing takes are both named in the one refusal", async () => {
  const said = await unlockRefusals(["a-rule-the-settings-hold", "one-spare", "two-spare"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare`")
  expect(said[0]).toContain("`two-spare`")
})
