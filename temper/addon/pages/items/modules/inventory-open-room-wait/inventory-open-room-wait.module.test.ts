import { describe, expect, test } from "bun:test"
import {
  roomWaitLine,
  waitForRoom,
} from "akasha/temper/addon/pages/items/modules/inventory-open-room-wait/inventory-open-room-wait.module.code.ts"

describe("inventory-open-room-wait", () => {
  test("each container left for want of room is counted", () => {
    let wait = waitForRoom(undefined, 2)
    wait = waitForRoom(wait, 1)
    wait = waitForRoom(wait, 3)
    expect(wait).toEqual({ containers: 3, lootSlots: 1 })
  })

  test("the line names the free slots the smallest open needs above the buffer", () => {
    const wait = { containers: 9, lootSlots: 1 }
    expect(roomWaitLine(wait, 15)).toBe("9 containers waiting: need 16 free slots")
  })

  test("a single container is named in the singular", () => {
    expect(roomWaitLine({ containers: 1, lootSlots: 0 }, 15)).toBe(
      "1 container waiting: need 15 free slots"
    )
  })
})
