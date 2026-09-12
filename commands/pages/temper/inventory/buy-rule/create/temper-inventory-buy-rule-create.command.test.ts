import { expect, test } from "bun:test"
import { active } from "akasha/commands/arguments/pages/active.argument.ts"
import { itemId } from "akasha/commands/arguments/pages/item-id.argument.ts"
import { source as sourceArgument } from "akasha/commands/arguments/pages/source.argument.ts"
import { targetQuantity } from "akasha/commands/arguments/pages/target-quantity.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  making,
  type Taken,
  temperInventoryBuyRuleCreate,
} from "akasha/commands/pages/temper/inventory/buy-rule/create/temper-inventory-buy-rule-create.command.code.ts"
import { temperInventoryBuyRuleCreate as page } from "akasha/commands/pages/temper/inventory/buy-rule/create/temper-inventory-buy-rule-create.command.ts"
import {
  WROTE,
  writingThat,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const CALLED_AS = "akasha temper inventory buy-rule create"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ASKED: Taken = { itemId: 45336, itemName: "a thing the merchant sells", targetQuantity: 5 }

const createRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryBuyRuleCreate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

test("the page needs the item, its name and the target, and leaves the source to the call", () => {
  expect(page.arguments.length).toBe(8)
  expect(page.arguments[4]?.required).toBe(true)
  expect(page.arguments[5]?.required).toBe(true)
  expect(page.arguments[6]?.required).toBe(true)
  expect(page.arguments[7]?.argument).toContain(sourceArgument.slug)
})

test("a call saying none of the three it needs is refused for all three", async () => {
  const said = await createRefusals([])
  expect(said.join("\n")).toContain(itemId.said)
  expect(said.join("\n")).toContain(targetQuantity.said)
})

test("a target that is no whole number is refused rather than read as one", async () => {
  const said = await createRefusals([targetQuantity.said, "a-few"])
  expect(said.join("\n")).toContain("a-few")
  expect(said.join("\n")).toContain("whole number")
})

test("a source no buy rule buys at is refused before the store is read at all", async () => {
  const done: string[] = []
  const said = await making({ ...ASKED, source: "a-back-alley" }, WROTE, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("a-back-alley")
  expect(said.refusals.join("\n")).toContain(sourceArgument.said)
})

test("a rule added is named on the caller's list as soon as the write has gone", async () => {
  const done: string[] = []
  const said = await making(ASKED, WROTE, done)
  expect(said.refusals).toEqual([])
  expect(done.length).toBe(1)
  expect(done[0]).toContain("buy rule")
  expect(done[0]).toContain("added")
})

test("a rule added inactive is answered with the call that would start it", async () => {
  const said = await making(ASKED, WROTE, [])
  expect(said.report.join("\n")).toContain("inactive")
  expect(said.report.join("\n")).toContain(active.said)
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) => making(ASKED, refusing, done))
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})
