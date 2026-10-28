import { describe, expect, test } from "bun:test"
import {
  computeStockTierDeposit,
  computeStockTierSale,
  type StockTierDepositInput,
  stockHandOff,
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

  test("the hand-off is what each other character is short of the fill quantity", () => {
    expect(
      stockHandOff(
        20,
        Array.from({ length: 19 }, () => 0)
      )
    ).toBe(380)
    expect(stockHandOff(20, [0, 5, 20, 35])).toBe(35)
    expect(stockHandOff(20, [])).toBe(0)
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

  test("a character holding 500 empty soul gems over a stock of 200 banks 300", () => {
    const moved = depositVisit([200, 200, 100], {
      backpackCount: 500,
      selfTarget: 200,
      tierCap: undefined,
      tierAccountWideCount: 0,
      handOff: 0,
    })
    expect(moved).toEqual([200, 100, 0])
  })
})

describe("A holder sells only what its own stock, a capped tier's room and the hand-off leave.", () => {
  test("a holder of 15000 empty soul gems keeps 200, the bank's 200 and 4000 for others", () => {
    expect(
      computeStockTierSale({
        backpackCount: 15000,
        selfTarget: 200,
        tierRoom: 200,
        handOff: 20 * 200,
      })
    ).toBe(10600)
  })

  test("a holder sells nothing while the others are short of more than it holds over", () => {
    expect(
      computeStockTierSale({ backpackCount: 500, selfTarget: 200, tierRoom: 200, handOff: 400 })
    ).toBe(0)
  })

  test("once the bank holds its count and every other character is stocked, all past 200 sells", () => {
    expect(
      computeStockTierSale({ backpackCount: 10800, selfTarget: 200, tierRoom: 0, handOff: 0 })
    ).toBe(10600)
  })
})
