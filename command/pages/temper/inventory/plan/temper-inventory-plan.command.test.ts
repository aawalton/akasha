import { expect, test } from "bun:test"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  endingRuleIds,
  planSaid,
  temperInventoryPlan,
  undecidedByItem,
  unmappedItems,
  unmappedSaid,
} from "akasha/command/pages/temper/inventory/plan/temper-inventory-plan.command.code.ts"
import {
  type CompiledOrderedRule,
  IMPLICIT_TERMINAL_COMPILED_RULE,
} from "akasha/temper/items/rules/core/modules/inventory-rule-compiler-types/inventory-rule-compiler-types.module.code.ts"
import type { AffectedItem } from "akasha/temper/items/rules/core/modules/inventory-rule-matcher-types/inventory-rule-matcher-types.module.code.ts"
import { IMPLICIT_TERMINAL_RULE_ID } from "akasha/temper/items/rules/core/modules/inventory-rule-types/inventory-rule-types.module.code.ts"
import type { WalkOutcome } from "akasha/temper/items/rules/eval/modules/eval-result/eval-result.module.code.ts"
import type { ManagementPlan } from "akasha/temper/items/rules/routing/core/modules/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha temper inventory plan",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("the inventory file said twice is refused rather than read as the last saying", async () => {
  const said = await temperInventoryPlan(
    ["--inventory-path", "one.lua", "--inventory-path", "two.lua"],
    GIVEN
  )

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--inventory-path` is said twice")
})

test("a saved variables file named for the holdings is read in place of the stored reading", async () => {
  const said = await temperInventoryPlan(["--inventory-path", "missing/TemperItems.lua"], GIVEN)

  expect(said.code).toBe(DATA)
  expect(said.refusals.join("\n")).toContain(
    "TemperItems.lua at /nowhere/missing/TemperItems.lua would not open"
  )
})

test("a flag this takes no argument for is refused", async () => {
  const said = await temperInventoryPlan(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a bare word is refused, this command taking none", async () => {
  const said = await temperInventoryPlan(["TemperItems.lua"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`TemperItems.lua` is no argument")
})

test("a flag taking a value with nothing after it is refused", async () => {
  const said = await temperInventoryPlan(["--characters-path"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain(
    "`--characters-path` takes a value, and none follows it"
  )
})

test("the switch carrying a value is refused, that switch carrying none", async () => {
  const said = await temperInventoryPlan(["--checklist=yes"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--checklist` carries no value")
})

test("a plan with no venue stop says so rather than saying nothing", () => {
  const empty: ManagementPlan = {
    sessions: [],
    totalCharacterSwitches: 0,
    totalVenueVisits: 0,
    totalSlots: 0,
  }

  expect(planSaid(empty)).toEqual(["[TemperItems] Plan:", "  (no actions pending)"])
})

test("holdings every rule reaches are said as such rather than as an empty list", () => {
  expect(unmappedSaid({ unreached: [], undecided: [] })).toEqual([
    "[TemperItems] Unmapped:",
    "  every item the holdings hold is reached by a rule.",
    "  no item a rule reaches is left undecided.",
  ])
})

test("the items no rule reaches are counted by unit and by kind", () => {
  expect(
    unmappedSaid({
      unreached: [
        { itemId: 1, itemName: "Dwarven Oil", units: 14 },
        { itemId: 2, itemName: "Grand Repair Kit", units: 9 },
      ],
      undecided: [],
    })
  ).toEqual([
    "[TemperItems] Unmapped:",
    "  no rule reaches 23 item(s) of 2 kind(s):",
    "    Dwarven Oil ×14",
    "    Grand Repair Kit ×9",
    "  no item a rule reaches is left undecided.",
  ])
})

function couldNotDecide(conditionKind: string, missingSignal: string): WalkOutcome {
  return {
    kind: "indeterminate",
    indeterminateRules: [
      {
        index: 51,
        categoryId: "all",
        action: "deconstruct",
        verdict: {
          kind: "indeterminate",
          reason: { kind: "condition-unknown", conditionKind, missingSignal },
        },
      },
    ],
  }
}

const DECIDED: WalkOutcome = { kind: "implicit-terminal", action: "nothing", label: "Nothing" }

test("an item a rule could not decide is gathered by the item it is rather than by the stack", () => {
  expect(
    undecidedByItem([
      {
        itemId: 71779,
        itemName: "Counterfeit Pardon Edict",
        units: 10,
        outcome: couldNotDecide("targetQuantity", "bankStock"),
      },
      {
        itemId: 71779,
        itemName: "Counterfeit Pardon Edict",
        units: 9,
        outcome: couldNotDecide("canInspire", "crafting:8796093041077793"),
      },
      { itemId: 1, itemName: "Dwarven Oil", units: 14, outcome: DECIDED },
    ])
  ).toEqual([
    {
      itemId: 71779,
      itemName: "Counterfeit Pardon Edict",
      units: 19,
      missingSignals: ["bankStock", "crafting:8796093041077793"],
    },
  ])
})

test("the report tells an item no rule reaches from an item a rule could not decide", () => {
  expect(
    unmappedSaid({
      unreached: [{ itemId: 1, itemName: "Dwarven Oil", units: 14 }],
      undecided: [
        {
          itemId: 71779,
          itemName: "Counterfeit Pardon Edict",
          units: 84,
          missingSignals: ["stock tier eligibility unknown"],
        },
      ],
    })
  ).toEqual([
    "[TemperItems] Unmapped:",
    "  no rule reaches 14 item(s) of 1 kind(s):",
    "    Dwarven Oil ×14",
    "  a rule could not decide 84 item(s) of 1 kind(s):",
    "    Counterfeit Pardon Edict ×84 — stock tier eligibility unknown",
  ])
})

test("the switch naming the items no rule reaches carries no value", async () => {
  const said = await temperInventoryPlan(["--unmapped=yes"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--unmapped` carries no value")
})

const RULES: readonly CompiledOrderedRule[] = [
  { id: "worthless-destroy", categoryId: "all", action: "destroy", maxQuality: 1 },
  { id: "quest-items-nothing", categoryId: "quest-items", action: "nothing" },
  { id: "locked-nothing", categoryId: "all", action: "nothing", locked: "locked" },
  { id: "all#88", categoryId: "all", action: "nothing" },
  IMPLICIT_TERMINAL_COMPILED_RULE,
]

function affected(itemId: number, itemName: string, units: number): AffectedItem {
  return {
    item: {
      itemId,
      itemName,
      itemLink: "",
      quality: 3,
      filterType: 3,
      itemType: 5,
      traitType: 0,
      requiredLevel: 1,
      requiredCP: 0,
      stackCount: units,
    },
    locationKey: "1",
    locationDisplayName: "Emberkin",
    bagId: 1,
    alreadyAtDestination: false,
  }
}

test("the rules ending the list are the trailing run reaching every item and acting on none", () => {
  expect(endingRuleIds(RULES)).toEqual([IMPLICIT_TERMINAL_RULE_ID, "all#88"])
})

test("a rule acting on none of what it reaches under a condition ends no list", () => {
  expect(endingRuleIds(RULES.slice(0, 2))).toEqual([])
  expect(endingRuleIds(RULES.slice(0, 3))).toEqual([])
})

test("the items the config's own ending rule holds are unmapped though the matcher's holds none", () => {
  const ruleMap = new Map<string, readonly AffectedItem[]>([
    ["locked-nothing", [affected(3, "Ancestor Silk", 9)]],
    ["all#88", [affected(2, "Dwarven Oil", 14)]],
    [IMPLICIT_TERMINAL_RULE_ID, []],
  ])

  expect(unmappedItems(ruleMap, RULES).map((one) => one.item.itemName)).toEqual(["Dwarven Oil"])
})
