import { expect, test } from "bun:test"
import { saidForPart } from "akasha/commands/arguments/argument-taking/argument-taking.module.test-fixtures.ts"
import { categoryRuleId } from "akasha/commands/arguments/pages/category-rule-id.argument.ts"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { temperInventoryRuleUnlock } from "akasha/commands/pages/temper/inventory/rule/unlock/temper-inventory-rule-unlock.command.code.ts"
import { temperInventoryRuleUnlock as page } from "akasha/commands/pages/temper/inventory/rule/unlock/temper-inventory-rule-unlock.command.ts"

const CALLED_AS = "akasha temper inventory rule unlock"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const FLAG = saidForPart([categoryRuleId], page.arguments[0]?.argument ?? "")

const PLACED = `<${categoryRuleId.placeholder}>`

const unlockRefusing = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryRuleUnlock(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  expect(answer.code).toBe(INPUT)
  return answer.refusals
}

test("the page declares one argument, the category rule id, and this test carries it", () => {
  expect(page.arguments.length).toBe(1)
  expect(FLAG).toBe(categoryRuleId.said)
  expect(page.arguments[0]?.required).toBe(true)
  expect(page.arguments[0]?.saidAs).toBe("word")
})

test("a call naming no id asks for it by the placeholder its page carries", async () => {
  const said = await unlockRefusing([])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("saying the id at its flag is refused, since this takes it as a word", async () => {
  const said = await unlockRefusing([FLAG, "a-rule-the-settings-hold"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain(FLAG)
  expect(said[0]).toContain(`\`${PLACED}\``)
})

test("a `--` makes the word after it the id rather than a flag this takes none of", async () => {
  const said = await unlockRefusing(["--", FLAG, "a-spare-word"])
  expect(said.length).toBe(1)
  expect(said[0]).not.toContain("is no argument")
  expect(said[0]).toContain("`a-spare-word`")
})

test("two words nothing takes are both named in the one refusal", async () => {
  const said = await unlockRefusing(["a-rule-the-settings-hold", "one-spare", "two-spare"])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("1 word")
  expect(said[0]).toContain("3 words")
  expect(said[0]).toContain("`one-spare`")
  expect(said[0]).toContain("`two-spare`")
})
