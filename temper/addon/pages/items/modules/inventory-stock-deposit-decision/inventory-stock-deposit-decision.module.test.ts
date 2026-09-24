import { describe, expect, test } from "bun:test"
import {
  computeStockTierDeposit,
  type StockTierDepositInput,
} from "akasha/temper/addon/pages/items/modules/inventory-stock-deposit-decision/inventory-stock-deposit-decision.module.code.ts"

type Visit = Omit<StockTierDepositInput, "stackCount" | "alreadyDispatched">

function depositVisit(stacks: readonly number[], visit: Visit): number[] {
  const moved: number[] = []
  let alreadyDispatched = 0
  for (const stackCount of stacks) {
    const toMove = computeStockTierDeposit({ ...visit, stackCount, alreadyDispatched })
    moved.push(toMove)
    alreadyDispatched += toMove
  }
  return moved
}

describe("inventory-stock-deposit-decision", () => {
  test("a crafter's stacks for other characters all go to the bank beside the bank's own share", () => {
    const moved = depositVisit([100, 100, 100, 100], {
      backpackCount: 400,
      selfTarget: 20,
      tierCap: 100,
      tierAccountWideCount: 0,
      handOff: 19 * 20,
    })
    expect(moved).toEqual([100, 100, 100, 80])
  })

  test("the bank takes no more than its own share once every other character is stocked", () => {
    const moved = depositVisit([100, 100, 72], {
      backpackCount: 272,
      selfTarget: 20,
      tierCap: 100,
      tierAccountWideCount: 0,
      handOff: 0,
    })
    expect(moved).toEqual([100, 0, 0])
  })

  test("what the bank already holds counts against its share and the hand-off alike", () => {
    const moved = depositVisit([100, 100], {
      backpackCount: 200,
      selfTarget: 20,
      tierCap: 100,
      tierAccountWideCount: 90,
      handOff: 40,
    })
    expect(moved).toEqual([50, 0])
  })

  test("a tier with no cap takes the whole surplus", () => {
    const moved = depositVisit([100, 50], {
      backpackCount: 150,
      selfTarget: 20,
      tierCap: undefined,
      tierAccountWideCount: 0,
      handOff: 0,
    })
    expect(moved).toEqual([100, 30])
  })
})
