import { describe, expect, test } from "bun:test"
import {
  aimTakeBacks,
  aimVaultDeposits,
  planVaultDeposit,
  splitLanded,
} from "akasha/temper/addon/pages/items/modules/inventory-vault-deposit-plan/inventory-vault-deposit-plan.module.code.ts"

const ROOMY = 100

function range(from: number, count: number): number[] {
  return Array.from({ length: count }, (_, i) => from + i)
}

describe("inventory-vault-deposit-plan", () => {
  test("nothing pending plans nothing", () => {
    expect(planVaultDeposit([], [3, 4], ROOMY)).toEqual({ kind: "none" })
  })

  test("a pending slot the vault cannot take is left out", () => {
    expect(planVaultDeposit([7], [3], ROOMY)).toEqual({ kind: "none" })
  })

  test("every stowable slot pending stows all at once", () => {
    expect(planVaultDeposit([9, 2, 5], [2, 5, 9], ROOMY)).toEqual({
      kind: "stow-all",
      slots: [2, 5, 9],
    })
  })

  test("a stowable slot the rules keep sends moves where taking it back saves nothing", () => {
    expect(planVaultDeposit([9, 2], [2, 5, 9], ROOMY)).toEqual({ kind: "moves", slots: [2, 9] })
  })

  test("a slot named twice is moved once", () => {
    expect(planVaultDeposit([4, 4, 1], [1, 4, 8], ROOMY)).toEqual({ kind: "moves", slots: [1, 4] })
  })

  test("seventeen to stow and seven kept stow all and take seven back", () => {
    const pending = range(0, 17)
    const plan = planVaultDeposit(pending, range(0, 24), ROOMY)
    expect(plan).toEqual({
      kind: "stow-all-then-take-back",
      slots: pending,
      takeBack: range(17, 7),
    })
  })

  test("a vault without room for every stowable stack is sent moves instead", () => {
    const plan = planVaultDeposit(range(0, 17), range(0, 24), 23)
    expect(plan).toEqual({ kind: "moves", slots: range(0, 17) })
  })

  test("taking back as many as a move each would save is sent moves", () => {
    expect(planVaultDeposit(range(0, 4), range(0, 7), ROOMY).kind).toBe("moves")
    expect(planVaultDeposit(range(0, 5), range(0, 8), ROOMY).kind).toBe("stow-all-then-take-back")
  })

  test("a kept stack is taken back from the vault slot holding its item", () => {
    const links: Record<number, string> = { 0: "a", 1: "b", 2: "b", 4: "c" }
    const stacks: Record<number, number> = { 0: 5, 1: 1, 2: 3, 4: 2 }
    const backpack: Record<number, number> = { 0: 9, 2: 1 }
    const aimed = aimTakeBacks(
      [
        { itemLink: "b", count: 3 },
        { itemLink: "b", count: 1 },
        { itemLink: "z", count: 1 },
        { itemLink: "c", count: 2 },
      ],
      6,
      (slot) => links[slot] ?? "",
      (slot) => stacks[slot] ?? 0,
      5,
      (slot) => backpack[slot] ?? 0
    )
    expect(aimed).toEqual([
      { source: 2, target: 1, count: 3 },
      { source: 1, target: 3, count: 1 },
      { source: 4, target: 4, count: 2 },
    ])
  })

  test("a stack merged into a larger vault stack is taken back by its own count", () => {
    const aimed = aimTakeBacks(
      [{ itemLink: "a", count: 1 }],
      2,
      () => "a",
      (slot) => (slot === 0 ? 3 : 0),
      2,
      () => 0
    )
    expect(aimed).toEqual([{ source: 0, target: 0, count: 1 }])
  })

  test("a full backpack takes nothing back", () => {
    const aimed = aimTakeBacks(
      [{ itemLink: "a", count: 1 }],
      1,
      () => "a",
      () => 1,
      2,
      () => 1
    )
    expect(aimed).toEqual([])
  })

  test("each deposit sent together aims at an empty vault slot of its own", () => {
    const held: Record<number, number> = { 0: 3, 2: 1 }
    expect(aimVaultDeposits([2, 9, 11], 6, (slot) => held[slot] ?? 0)).toEqual([
      { slot: 2, target: 1 },
      { slot: 9, target: 3 },
      { slot: 11, target: 4 },
    ])
  })

  test("a vault with one empty slot takes one deposit of seventeen", () => {
    const pending = Array.from({ length: 17 }, (_, i) => i)
    const aimed = aimVaultDeposits(pending, 500, (slot) => (slot === 499 ? 0 : 1))
    expect(aimed).toEqual([{ slot: 0, target: 499 }])
  })

  test("a full vault is sent no deposit", () => {
    expect(aimVaultDeposits([3, 5], 4, () => 1)).toEqual([])
  })

  test("a slot left empty landed and a slot still holding its stack is left", () => {
    const stacks: Record<number, number> = { 1: 0, 4: 3, 6: 0 }
    expect(splitLanded([1, 4, 6], (slot) => stacks[slot] ?? 0)).toEqual({
      landed: [1, 6],
      left: [4],
    })
  })
})
