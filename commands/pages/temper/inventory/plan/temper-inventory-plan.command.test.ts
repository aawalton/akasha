import { expect, test } from "bun:test"
import { INPUT } from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  planSaid,
  temperInventoryPlan,
  unmappedSaid,
} from "akasha/commands/pages/temper/inventory/plan/temper-inventory-plan.command.code.ts"
import type { ManagementPlan } from "akasha/temper/items-rules-routing-core/inventory-management-plan-types/inventory-management-plan-types.module.code.ts"

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

test("a flag this takes no argument for is refused", async () => {
  const said = await temperInventoryPlan(["--nonsense"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--nonsense` is no argument")
})

test("a bare word is refused, this command taking none", async () => {
  const said = await temperInventoryPlan(["TemperInventory.lua"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`TemperInventory.lua` is no argument")
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

  expect(planSaid(empty)).toEqual(["[TemperInventory] Plan:", "  (no actions pending)"])
})

test("holdings every rule reaches are said as such rather than as an empty list", () => {
  expect(unmappedSaid([])).toEqual([
    "[TemperInventory] Unmapped:",
    "  every item the holdings hold is reached by a rule.",
  ])
})

test("the items no rule reaches are counted by unit and by kind", () => {
  expect(
    unmappedSaid([
      { itemId: 1, itemName: "Dwarven Oil", units: 14 },
      { itemId: 2, itemName: "Grand Repair Kit", units: 9 },
    ])
  ).toEqual([
    "[TemperInventory] Unmapped:",
    "  no rule reaches 23 item(s) of 2 kind(s):",
    "    Dwarven Oil ×14",
    "    Grand Repair Kit ×9",
  ])
})

test("the switch naming the items no rule reaches carries no value", async () => {
  const said = await temperInventoryPlan(["--unmapped=yes"], GIVEN)

  expect(said.code).toBe(INPUT)
  expect(said.refusals.join("\n")).toContain("`--unmapped` carries no value")
})
