import { expect, test } from "bun:test"
import {
  agreementSaid,
  coverageSaid,
  differingBetween,
  type FreshInputs,
  freshVerdictFor,
  itemRuleDestination,
  rowsFrom,
  rowsSaid,
  type StackReading,
  uncoveredSaid,
  type Verdict,
  verdictRecordedOn,
} from "akasha/commands/pages/temper/inventory/record-parity/temper-inventory-record-parity.command.code.ts"
import type { InventoryItemData } from "akasha/temper/items-core/modules/inventory-types/inventory-types.module.code.ts"
import type { CompiledOrderedRule } from "akasha/temper/items-rules-core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { ItemRule } from "akasha/temper/items-rules-core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { ItemFacts } from "akasha/temper/items-rules-eval/modules/item-facts/item-facts.module.code.ts"
import { buildWebEvalEnv } from "akasha/temper/items-rules-matcher/modules/web-eval-env/web-eval-env.module.code.ts"

const LOCKPICK = 30357

const FACTS: ItemFacts = {
  itemId: LOCKPICK,
  itemName: "Lockpick",
  itemLink: "",
  categoryNodeIds: ["all"],
}

function itemOf(over: Partial<InventoryItemData>): InventoryItemData {
  return {
    itemId: LOCKPICK,
    itemName: "Lockpick",
    itemLink: "",
    quality: 1,
    filterType: 1,
    itemType: 1,
    traitType: 0,
    requiredLevel: 1,
    requiredCP: 0,
    stackCount: 1,
    ...over,
  }
}

function inputsOf(
  orderedRules: readonly CompiledOrderedRule[],
  itemRules: readonly ItemRule[],
  queued: readonly (readonly [number, string])[]
): FreshInputs {
  return {
    orderedRules,
    itemRuleById: new Map(itemRules.map((one) => [one.itemId, one])),
    queuedById: new Map(queued),
    ctx: { env: buildWebEvalEnv(undefined) },
  }
}

function verdictOf(over: Partial<Verdict>): Verdict {
  return { action: "nothing", destination: null, by: "ordered-rule", ruleIndex: 3, ...over }
}

function reading(recorded: Verdict, freshVerdict: Verdict): StackReading {
  return { itemId: LOCKPICK, itemName: "Lockpick", recorded, fresh: freshVerdict }
}

test("a stack the addon never resolved carries no verdict to compare", () => {
  expect(verdictRecordedOn(itemOf({}))).toBeUndefined()
})

test("the four fields the addon wrote are read back as one verdict", () => {
  const recorded = verdictRecordedOn(
    itemOf({
      resolvedAction: "stock",
      resolvedDestination: "bank",
      resolvedBy: "ordered-rule",
      resolvedRuleIndex: 29,
    })
  )
  expect(recorded).toEqual({
    action: "stock",
    destination: "bank",
    by: "ordered-rule",
    ruleIndex: 29,
  })
})

test("a record naming an action the fresh reading does not reach names the action", () => {
  expect(differingBetween(verdictOf({ action: "stock" }), verdictOf({ action: "sell" }))).toEqual([
    "action",
  ])
})

test("a record naming a place the fresh reading does not reach names the destination", () => {
  expect(
    differingBetween(verdictOf({ destination: "bank" }), verdictOf({ destination: "craft-bag" }))
  ).toEqual(["destination"])
})

test("two ordered rules disagreeing over which one took the item name the rule", () => {
  expect(differingBetween(verdictOf({ ruleIndex: 29 }), verdictOf({ ruleIndex: 30 }))).toEqual([
    "rule",
  ])
})

test("a rule index goes uncompared where one side names no ordered rule", () => {
  expect(
    differingBetween(
      verdictOf({ by: "item-rule", ruleIndex: null }),
      verdictOf({ by: "ordered-rule", ruleIndex: 7 })
    )
  ).toEqual([])
})

test("stacks of one item disagreeing the same way are gathered into one row", () => {
  const one = reading(verdictOf({ action: "stock" }), verdictOf({ action: "sell" }))
  const rows = rowsFrom([one, one, one])
  expect(rows).toHaveLength(1)
  expect(rows[0]?.stacks).toBe(3)
  expect(rows[0]?.differing).toEqual(["action"])
  const said = rowsSaid(rows, 1).join("\n")
  expect(said).toContain("over 3 stacks")
  expect(said).toContain("recorded  stock")
  expect(said).toContain("fresh     sell")
})

test("an item the record and the fresh reading agree on raises no row", () => {
  expect(rowsFrom([reading(verdictOf({}), verdictOf({}))])).toHaveLength(0)
})

test("a run finding nothing says the two agree rather than answering empty", () => {
  const said = rowsSaid([], 300).join("\n")
  expect(said).toContain("(none)")
  expect(said).toContain(agreementSaid(300))
  expect(said).toContain("300 items")
})

test("an item carrying no record is counted apart rather than as a disagreement", () => {
  const counted = {
    items: 412,
    stacks: 1979,
    recordedStacks: 1205,
    itemsCompared: 300,
    itemsUncovered: 112,
  }
  const said = uncoveredSaid(counted).join("\n")
  expect(said).toContain("OUT OF COVERAGE")
  expect(said).toContain("112 items carry no record")
  expect(rowsSaid([], counted.itemsCompared).join("\n")).not.toContain("112")
})

test("how much is covered is counted from the records present", () => {
  const said = coverageSaid({
    items: 412,
    stacks: 1979,
    recordedStacks: 1205,
    itemsCompared: 300,
    itemsUncovered: 112,
  }).join("\n")
  expect(said).toContain("1205 of 1979 stacks")
  expect(said).toContain("60.9%")
  expect(said).toContain("300 of 412 items")
})

test("a locked item no unlock rule reaches is resolved to nothing", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "sell" }
  expect(freshVerdictFor(itemOf({ locked: true }), FACTS, inputsOf([rule], [], []))).toEqual({
    action: "nothing",
    destination: null,
    by: "no-match",
    ruleIndex: null,
  })
})

test("a locked item an unlock rule reaches names that rule", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "unlock", locked: "locked" }
  const locked: ItemFacts = { ...FACTS, isLocked: true }
  expect(freshVerdictFor(itemOf({ locked: true }), locked, inputsOf([rule], [], []))).toEqual({
    action: "unlock",
    destination: null,
    by: "ordered-rule",
    ruleIndex: 0,
  })
})

test("a queued verdict decides an unlocked item before any rule does", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "sell" }
  expect(freshVerdictFor(itemOf({}), FACTS, inputsOf([rule], [], [[LOCKPICK, "nothing"]]))).toEqual(
    {
      action: "nothing",
      destination: null,
      by: "item-verdict-outbox",
      ruleIndex: null,
    }
  )
})

test("an item rule decides an unlocked item before an ordered rule does", () => {
  const rule: CompiledOrderedRule = { categoryId: "all", action: "sell" }
  const itemRule: ItemRule = {
    id: "item:30357",
    itemId: LOCKPICK,
    itemName: "",
    action: "stock",
    destination: "character:by-priority",
  }
  expect(freshVerdictFor(itemOf({}), FACTS, inputsOf([rule], [itemRule], []))).toEqual({
    action: "stock",
    destination: "bank",
    by: "item-rule",
    ruleIndex: null,
  })
})

test("an item rule stocking by priority sends its surplus where the addon sends it", () => {
  expect(
    itemRuleDestination({
      id: "item:30357",
      itemId: LOCKPICK,
      itemName: "",
      action: "stock",
      destination: "character:by-priority",
    })
  ).toBe("bank")
})

test("an ordered rule that matches names itself and the place it sends the item", () => {
  const rules: readonly CompiledOrderedRule[] = [
    { categoryId: "weapons", action: "sell" },
    { categoryId: "all", action: "move-to", destination: "bank" },
  ]
  expect(freshVerdictFor(itemOf({}), FACTS, inputsOf(rules, [], []))).toEqual({
    action: "move-to",
    destination: "bank",
    by: "ordered-rule",
    ruleIndex: 1,
  })
})
