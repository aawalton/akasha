import { expect, test } from "bun:test"
import { action } from "akasha/commands/arguments/pages/action.argument.ts"
import { destination } from "akasha/commands/arguments/pages/destination.argument.ts"
import { itemRuleId } from "akasha/commands/arguments/pages/item-rule-id.argument.ts"
import { title } from "akasha/commands/arguments/pages/title.argument.ts"
import {
  answering,
  INPUT,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import {
  changing,
  type Taken,
  temperInventoryItemRuleUpdate,
} from "akasha/commands/pages/temper/inventory/item-rule/update/temper-inventory-item-rule-update.command.code.ts"
import { temperInventoryItemRuleUpdate as page } from "akasha/commands/pages/temper/inventory/item-rule/update/temper-inventory-item-rule-update.command.ts"
import {
  type Writing,
  wroteSaid,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.code.ts"
import {
  ITEM_HELD,
  ITEM_LOCKED,
  UNREADABLE,
  WROTE,
  writingThat,
} from "akasha/temper/commands/inventory-rule-calling/inventory-rule-calling.module.test-fixtures.ts"
import type { InventoryRuleSettings } from "akasha/temper/items-rules-core/inventory-rule-types/inventory-rule-types.module.code.ts"

const CALLED_AS = "akasha temper inventory item-rule update"

const REPO = rootOf(import.meta.dir)

const GIVEN: Given = { root: REPO, calledAs: CALLED_AS, from: REPO, writer: null, agentId: null }

const TITLE = "a title the call gives it"

const updateRefusals = async (argv: readonly string[]): Promise<readonly string[]> => {
  const answer = await temperInventoryItemRuleUpdate(argv, GIVEN)
  if (answer.refusals.length === 0) {
    throw new Error(`\`${argv.join(" ")}\` was taken rather than refused`)
  }
  return answer.refusals
}

async function answered(act: (done: string[]) => Promise<Answer>): Promise<Answer> {
  return await answering(async (done) => await act(done))
}

function changingWith(held: Partial<Taken>, writing: Writing, done: string[]): Promise<Answer> {
  return changing({ itemRuleId: ITEM_HELD, force: false, ...held }, CALLED_AS, writing, done)
}

test("the page takes the id as a word and every field it changes at a flag", () => {
  expect(page.arguments.length).toBe(9)
  expect(page.arguments[8]?.argument).toContain(itemRuleId.slug)
  expect(page.arguments[8]?.required).toBe(true)
  expect(page.arguments[8]?.saidAs).toBe("word")
})

test("a call naming a field to change but no id is refused for the id", async () => {
  const said = await updateRefusals([title.said, TITLE])
  expect(said.join("\n")).toContain(`<${itemRuleId.placeholder}>`)
})

test("a call naming no field to change is refused, naming the fields it does change", async () => {
  const said = await updateRefusals([ITEM_HELD])
  expect(said.length).toBe(1)
  expect(said[0]).toContain("names no field to change")
  expect(said[0]).toContain(destination.said)
})

test("an action no item rule takes is refused, and the store is never read for it", async () => {
  const said = await updateRefusals([ITEM_HELD, action.said, "polish-it"])
  expect(said.join("\n")).toContain("invalid action 'polish-it'")
})

test("a destination that is no destination is refused before the store is read at all", async () => {
  const done: string[] = []
  const said = await changingWith({ destination: "the-moon" }, UNREADABLE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("the-moon")
  expect(said.refusals.join("\n")).toContain(destination.said)
})

test("an id the settings carry no item rule for writes nothing and names nothing", async () => {
  const done: string[] = []
  const said = await changingWith(
    { itemRuleId: "no-item-rule-carries-this", title: TITLE },
    WROTE,
    done
  )
  expect(done).toEqual([])
  expect(said.refusals.join("\n")).toContain("no-item-rule-carries-this")
})

test("a locked item rule is refused, and nothing is written while it is refused", async () => {
  const done: string[] = []
  const said = await changingWith({ itemRuleId: ITEM_LOCKED, title: TITLE }, WROTE, done)
  expect(done).toEqual([])
  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("is locked")
})

test("a locked item rule the call forces is changed, and that change is named", async () => {
  const done: string[] = []
  const said = await changingWith(
    { itemRuleId: ITEM_LOCKED, force: true, title: TITLE },
    WROTE,
    done
  )
  expect(said.refusals).toEqual([])
  expect(done).toEqual([wroteSaid("item", ITEM_LOCKED, "changed")])
})

test("the change reaches the store, and is named on the caller's list once it has", async () => {
  const done: string[] = []
  const written: InventoryRuleSettings[] = []
  const keeping = writingThat((settings) => {
    written.push(settings)
    return Promise.resolve()
  })
  const said = await changingWith({ title: TITLE }, keeping, done)
  expect(said.refusals).toEqual([])
  expect(written[0]?.itemRules?.find((one) => one.id === ITEM_HELD)?.title).toBe(TITLE)
  expect(done).toEqual([wroteSaid("item", ITEM_HELD, "changed")])
})

test("a write the store refuses names nothing, because nothing was written", async () => {
  const refusing = writingThat(() => Promise.reject(new Error("the store would not take it")))
  const said = await answered((done) => changingWith({ title: TITLE }, refusing, done))
  expect(said.refusals.join("\n")).toContain("would not take it")
  expect(said.refusals.join("\n")).not.toContain("stopped part way")
})

test("a change that wrote and then threw names that write in its refusal", async () => {
  const said = await answered(async (done) => {
    await changingWith({ title: TITLE }, WROTE, done)
    throw new Error("the answer would not be composed")
  })
  expect(said.refusals.join("\n")).toContain("would not be composed")
  expect(said.refusals.join("\n")).toContain("stopped part way")
  expect(said.refusals.join("\n")).toContain(wroteSaid("item", ITEM_HELD, "changed"))
})
