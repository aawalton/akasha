import { describe, expect, test } from "bun:test"
import {
  mayOpen,
  mayUse,
} from "akasha/temper/addon/pages/items/modules/inventory-use-guard/inventory-use-guard.module.code.ts"

const TROPHY = 5
const MOTIF = 8

describe("inventory-use-guard", () => {
  test("only a container is opened", () => {
    expect(mayOpen(18)).toBe(true)
    expect(mayOpen(70)).toBe(true)
    expect(mayOpen(75)).toBe(true)
    expect(mayOpen(TROPHY)).toBe(false)
    expect(mayOpen(60)).toBe(false)
  })

  test("a treasure map, a survey report, a master writ and a holiday writ are never used", () => {
    expect(mayUse(TROPHY, 100)).toBe(false)
    expect(mayUse(TROPHY, 101)).toBe(false)
    expect(mayUse(60, 2750)).toBe(false)
    expect(mayUse(60, 2760)).toBe(false)
    expect(mayUse(60, 0)).toBe(false)
  })

  test("a motif and a recipe fragment are used", () => {
    expect(mayUse(MOTIF, 60)).toBe(true)
    expect(mayUse(TROPHY, 104)).toBe(true)
  })
})
