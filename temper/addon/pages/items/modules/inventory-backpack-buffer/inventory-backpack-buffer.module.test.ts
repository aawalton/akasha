import { describe, expect, test } from "bun:test"
import {
  openFitsAboveBuffer,
  slotsAnOpenTakes,
} from "akasha/temper/addon/pages/items/modules/inventory-backpack-buffer/inventory-backpack-buffer.module.code.ts"

describe("inventory-backpack-buffer", () => {
  test("a container emptying its slot takes one slot fewer than its loot", () => {
    expect(slotsAnOpenTakes(1, true)).toBe(0)
    expect(slotsAnOpenTakes(0, true)).toBe(0)
    expect(slotsAnOpenTakes(3, true)).toBe(2)
    expect(slotsAnOpenTakes(1, false)).toBe(1)
  })

  test("a container whose loot takes one slot opens with the backpack under the buffer", () => {
    expect(openFitsAboveBuffer(slotsAnOpenTakes(1, true), 9, 15)).toBe(true)
  })

  test("loot taking more than the container empties needs that many slots above the buffer", () => {
    expect(openFitsAboveBuffer(slotsAnOpenTakes(3, true), 9, 15)).toBe(false)
    expect(openFitsAboveBuffer(slotsAnOpenTakes(3, true), 17, 15)).toBe(true)
  })

  test("a container left in its stack empties no slot", () => {
    expect(openFitsAboveBuffer(slotsAnOpenTakes(1, false), 15, 15)).toBe(false)
    expect(openFitsAboveBuffer(slotsAnOpenTakes(1, false), 16, 15)).toBe(true)
  })
})
