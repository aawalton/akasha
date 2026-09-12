import { expect, test } from "bun:test"
import { buyRuleId } from "akasha/commands/arguments/pages/buy-rule-id.argument.ts"
import { source as sourceArgument } from "akasha/commands/arguments/pages/source.argument.ts"
import { targetQuantity as targetArgument } from "akasha/commands/arguments/pages/target-quantity.argument.ts"
import {
  answering,
  INPUT,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  changing,
  type Taken,
  temperInventoryBuyRuleUpdate,
} from "akasha/commands/pages/temper/inventory/buy-rule/update/temper-inventory-buy-rule-update.command.code.ts"
import { temperInventoryBuyRuleUpdate as page } from "akasha/commands/pages/temper/inventory/buy-rule/update/temper-inventory-buy-rule-update.command.ts"
import { writingThat } from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const CALLED_AS = "akasha temper inventory buy-rule update"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const HELD = "a-buy-rule-the-settings-hold"

const SHUT = "a-buy-rule-the-settings-lock"

const BUYING = writingThat(() => Promise.resolve())

const updateRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryBuyRuleUpdate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

function changingWith(held: Partial<Taken>, done: string[]): Promise<Answer> {
  return changing({ buyRuleId: HELD, force: false, ...held }, CALLED_AS, BUYING, done)
}

test("the page declares the id as a word and every field it changes at a flag", () => {
  expect(page.arguments.length).toBe(8)
  expect(page.arguments[7]?.argument).toContain(buyRuleId.slug)
  expect(page.arguments[7]?.required).toBe(true)
  expect(page.arguments[7]?.saidAs).toBe("word")
})

test("a call naming a field to change but no id is refused for the id", async () => {
  const said = await updateRefusals([targetArgument.said, "5"])
  expect(said.join("\n")).toContain(`<${buyRuleId.placeholder}>`)
})

test("a call naming no field to change is refused, naming the fields it does change", async () => {
  const said = await updateRefusals([HELD])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("names no field to change")
  expect(said[0]).toContain(targetArgument.said)
})

test("a source no buy rule buys at is refused before the store is read at all", async () => {
  const done: string[] = []
  const said = await changingWith({ source: "a-back-alley" }, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("a-back-alley")
  expect(said.refusals.join("\n")).toContain(sourceArgument.said)
})

test("an id the settings carry no buy rule for writes nothing and names nothing", async () => {
  const done: string[] = []
  const said = await changingWith({ buyRuleId: SHUT, title: "a new title" }, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain(SHUT)
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) =>
    changing({ buyRuleId: HELD, force: false, title: "a new title" }, CALLED_AS, refusing, done)
  )
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})
