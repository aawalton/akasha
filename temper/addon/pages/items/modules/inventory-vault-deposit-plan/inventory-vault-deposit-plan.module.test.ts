import { describe, expect, test } from "bun:test"
import {
  planVaultDeposit,
  splitLanded,
} from "akasha/temper/addon/pages/items/modules/inventory-vault-deposit-plan/inventory-vault-deposit-plan.module.code.ts"

describe("inventory-vault-deposit-plan", () => {
  test("nothing pending plans nothing", () => {
    expect(planVaultDeposit([], [3, 4])).toEqual({ kind: "none" })
  })

  test("a pending slot the vault cannot take is left out", () => {
    expect(planVaultDeposit([7], [3])).toEqual({ kind: "none" })
  })

  test("every stowable slot pending stows all at once", () => {
    expect(planVaultDeposit([9, 2, 5], [2, 5, 9])).toEqual({ kind: "stow-all", slots: [2, 5, 9] })
  })

  test("a stowable slot the rules keep sends moves one slot each", () => {
    expect(planVaultDeposit([9, 2], [2, 5, 9])).toEqual({ kind: "moves", slots: [2, 9] })
  })

  test("a slot named twice is moved once", () => {
    expect(planVaultDeposit([4, 4, 1], [1, 4, 8])).toEqual({ kind: "moves", slots: [1, 4] })
  })

  test("a slot left empty landed and a slot still holding its stack is left", () => {
    const stacks: Record<number, number> = { 1: 0, 4: 3, 6: 0 }
    expect(splitLanded([1, 4, 6], (slot) => stacks[slot] ?? 0)).toEqual({
      landed: [1, 6],
      left: [4],
    })
  })
})
