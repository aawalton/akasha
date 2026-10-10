import { describe, expect, test } from "bun:test"
import { planFilletMessage } from "akasha/temper/addon/pages/items/modules/inventory-fillet-plan/inventory-fillet-plan.module.code.ts"

const fish = (name: string, quantity: number) => ({ name, quantity })

describe("inventory-fillet-plan", () => {
  test("every fish fits one message where the game takes them all", () => {
    const plan = planFilletMessage([fish("a", 3), fish("b", 5)], 100, 100)
    expect(plan.map((t) => t.name)).toEqual(["a", "b"])
  })

  test("a message holds no more items than the game takes", () => {
    const plan = planFilletMessage([fish("a", 1), fish("b", 1), fish("c", 1)], 2, 100)
    expect(plan.map((t) => t.name)).toEqual(["a", "b"])
  })

  test("a message holds no more fish than the game takes", () => {
    const plan = planFilletMessage([fish("a", 60), fish("b", 50)], 100, 100)
    expect(plan.map((t) => t.name)).toEqual(["a"])
  })

  test("a first stack larger than one message takes is sent alone", () => {
    const plan = planFilletMessage([fish("a", 150), fish("b", 1)], 100, 100)
    expect(plan.map((t) => t.name)).toEqual(["a"])
  })

  test("an empty slot is skipped", () => {
    const plan = planFilletMessage([fish("a", 0), fish("b", 2)], 100, 100)
    expect(plan.map((t) => t.name)).toEqual(["b"])
  })
})
