import { expect, test } from "bun:test"
import {
  type MapExit,
  type MapRoom,
  mapLayoutOf,
} from "akasha/story/world/pages/library-system-reset-overdue-book-four-stubbed/stories/played/otherwhere-i/mechanics/rooms/modules/otherwhere-the-library-map-layout/otherwhere-the-library-map-layout.module.code.ts"

function room(at: string, depth: number | null, exits: readonly MapExit[], lit = true): MapRoom {
  return { id: at, at, title: at, lit, depth, exits }
}

const HALL = room("hall", 0, [
  { to: "core", direction: "down" },
  { to: "quarters", direction: null },
  { to: "kitchen", direction: null },
])

const CORE = room("core", -1, [{ to: "hall", direction: "up" }])

const QUARTERS = room("quarters", null, [{ to: "hall", direction: null }])

const KITCHEN = room("kitchen", null, [{ to: "hall", direction: null }])

const WING = room("wing", null, [], false)

const LIBRARY = [HALL, CORE, QUARTERS, KITCHEN, WING]

test("floors run from the highest depth down", () => {
  expect(mapLayoutOf(LIBRARY).floors.map((one) => one.depth)).toEqual([0, -1])
})

test("a stair down puts its room in the same column on the floor below", () => {
  const [upper, lower] = mapLayoutOf(LIBRARY).floors
  const hall = upper?.rooms.find((one) => one.room.at === "hall")
  const core = lower?.rooms.find((one) => one.room.at === "core")
  expect(core?.column).toBe(hall?.column)
  expect(hall?.down).toBe(true)
  expect(core?.up).toBe(true)
})

test("a room with no depth takes the floor of the room it connects to", () => {
  const upper = mapLayoutOf(LIBRARY).floors[0]
  expect(upper?.rooms.map((one) => one.room.at).sort()).toEqual(["hall", "kitchen", "quarters"])
})

test("rooms joined with no told direction sit beside each other, linked as untold", () => {
  const upper = mapLayoutOf(LIBRARY).floors[0]
  expect(upper?.rooms.every((one) => one.column === 0)).toBe(true)
  expect(upper?.rows).toBe(3)
  expect(upper?.links).toHaveLength(2)
  expect(upper?.links.every((one) => !one.told && !one.across)).toBe(true)
})

test("a room with no exit to a room on the map sits apart", () => {
  expect(mapLayoutOf(LIBRARY).apart.map((one) => one.at)).toEqual(["wing"])
})

test("an exit east puts its room one column east, linked as told", () => {
  const west = room("west", 0, [{ to: "east", direction: "east" }])
  const east = room("east", 0, [])
  const layout = mapLayoutOf([west, east])
  const [floor] = layout.floors
  expect(layout.columns).toBe(2)
  expect(floor?.rooms.find((one) => one.room.at === "east")?.column).toBe(1)
  expect(floor?.links).toEqual([{ column: 1, row: 0, across: true, told: true }])
})

test("an exit to a room not on the map is passed over", () => {
  const alone = room("alone", 0, [{ to: "unshown", direction: "north" }])
  const layout = mapLayoutOf([alone])
  expect(layout.floors).toEqual([])
  expect(layout.apart.map((one) => one.at)).toEqual(["alone"])
})
