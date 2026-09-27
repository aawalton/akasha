import { describe, expect, test } from "bun:test"
import {
  rememberSlotItem,
  removedSlotItem,
  restampSlotItem,
  type SlotItems,
} from "akasha/temper/addon/pages/items/crafting-station/modules/crafting-slot-items/crafting-slot-items.module.code.ts"

const DUMMY = "|H0:item:198000:0:0"
const SWORD = "|H0:item:43529:0:0"

describe("crafting-slot-items", () => {
  test("a removed slot whose game data was never stamped is known by bag and slot", () => {
    const items: SlotItems = {}
    rememberSlotItem(items, 1, 12, { lnk: DUMMY, uid: "77" })
    expect(removedSlotItem(items, 1, 12, {})).toEqual({ lnk: DUMMY, uid: "77" })
  })

  test("a link stamped on the game data is read before the item kept by slot", () => {
    const items: SlotItems = {}
    rememberSlotItem(items, 1, 12, { lnk: DUMMY, uid: "77" })
    expect(removedSlotItem(items, 1, 12, { lnk: SWORD, uid: "5" })).toEqual({
      lnk: SWORD,
      uid: "5",
    })
  })

  test("a removed slot known nowhere is answered with nothing", () => {
    const items: SlotItems = {}
    rememberSlotItem(items, 1, 3, { lnk: SWORD, uid: "5" })
    expect(removedSlotItem(items, 1, 12, {})).toBeUndefined()
    expect(removedSlotItem(items, 2, 3, {})).toBeUndefined()
  })

  test("a slot remembered again keeps only its latest item", () => {
    const items: SlotItems = {}
    rememberSlotItem(items, 1, 12, { lnk: SWORD, uid: "5" })
    rememberSlotItem(items, 1, 12, { lnk: DUMMY, uid: "77" })
    expect(removedSlotItem(items, 1, 12, {})).toEqual({ lnk: DUMMY, uid: "77" })
  })

  test("a slot that swaps item in place is removed as its new item", () => {
    const items: SlotItems = {}
    const data: { lnk?: string; uid?: string } = { lnk: SWORD, uid: "5" }
    rememberSlotItem(items, 1, 12, { lnk: SWORD, uid: "5" })
    restampSlotItem(items, 1, 12, data, { lnk: DUMMY, uid: "77" })
    expect(data).toEqual({ lnk: DUMMY, uid: "77" })
    expect(removedSlotItem(items, 1, 12, data)).toEqual({ lnk: DUMMY, uid: "77" })
    expect(removedSlotItem(items, 1, 12, {})).toEqual({ lnk: DUMMY, uid: "77" })
  })
})
