import { expect, test } from "bun:test"
import { destination } from "akasha/commands/arguments/pages/destination.argument.ts"
import { itemId } from "akasha/commands/arguments/pages/item-id.argument.ts"
import { itemName } from "akasha/commands/arguments/pages/item-name.argument.ts"
import { stockScope } from "akasha/commands/arguments/pages/stock-scope.argument.ts"
import { answering } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  making,
  type Taken,
  temperInventoryItemRuleCreate,
} from "akasha/commands/pages/temper/inventory/item-rule/create/temper-inventory-item-rule-create.command.code.ts"
import { temperInventoryItemRuleCreate as page } from "akasha/commands/pages/temper/inventory/item-rule/create/temper-inventory-item-rule-create.command.ts"
import {
  UNREADABLE,
  WROTE,
  writingThat,
} from "akasha/temper/commands/modules/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"

const CALLED_AS = "akasha temper inventory item-rule create"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const ASKED: Taken = { itemId: 45336, itemName: "a thing the bag holds" }

const createRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryItemRuleCreate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

test("the page needs the item and its name and leaves the action to the call", () => {
  expect(page.arguments.length).toBe(10)
  expect(page.arguments[7]?.required).toBe(true)
  expect(page.arguments[8]?.required).toBe(true)
  expect(page.arguments[7]?.argument).toContain(itemId.slug)
  expect(page.arguments[8]?.argument).toContain(itemName.slug)
})

test("a call saying neither the item nor its name is refused for both", async () => {
  const said = await createRefusals([])
  expect(said.join("\n")).toContain(itemId.said)
  expect(said.join("\n")).toContain(itemName.said)
})

test("the scope is taken and then refused, since an item rule carries none", async () => {
  const done: string[] = []
  const said = await making({ ...ASKED, stockScope: "any-character" }, WROTE, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain(stockScope.said)
  expect(said.refusals.join("\n")).toContain("carries no scope")
})

test("a destination that is no destination is refused before the store is read", async () => {
  const done: string[] = []
  const said = await making({ ...ASKED, destination: "the-moon" }, WROTE, done)
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("the-moon")
  expect(said.refusals.join("\n")).toContain(destination.said)
})

test("a rule added is named on the caller's list as soon as the write has gone", async () => {
  const done: string[] = []
  const said = await making(ASKED, WROTE, done)
  expect(said.refusals).toEqual([])
  expect(done.length).toBe(1)
  expect(done[0]).toContain("item rule")
  expect(done[0]).toContain("added")
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) => making(ASKED, refusing, done))
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})

test("a misspelled action is refused by a store that cannot be read, which never is", async () => {
  const said = await answered((done) => making({ ...ASKED, action: "polish-it" }, UNREADABLE, done))
  expect(said.refusals.join("\n")).toContain("polish-it")
  expect(said.refusals.join("\n")).not.toContain("would not be read")
})

test("a call spelt right reaches the store, and says so when the store cannot be read", async () => {
  const said = await answered((done) => making(ASKED, UNREADABLE, done))
  expect(said.refusals.join("\n")).toContain("would not be read")
})
