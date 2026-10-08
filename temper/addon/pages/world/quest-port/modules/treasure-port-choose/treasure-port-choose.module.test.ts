import { describe, expect, test } from "bun:test"
import {
  firstKnownTreasure,
  type MapFrame,
  reexpress,
  SPECIALIZED_SURVEY_REPORT,
  SPECIALIZED_TREASURE_MAP,
  spotsByItem,
  type TreasureSlot,
  universalDistance,
} from "akasha/temper/addon/pages/world/quest-port/modules/treasure-port-choose/treasure-port-choose.module.code.ts"

function slot(slotIndex: number, itemId: number, specializedItemType: number): TreasureSlot {
  return { slotIndex, itemId, specializedItemType, name: `item ${String(itemId)}` }
}

const ZONE: MapFrame = { offsetX: 0.2, offsetY: 0.4, width: 0.1, height: 0.1 }

const CITY: MapFrame = { offsetX: 0.25, offsetY: 0.45, width: 0.02, height: 0.02 }

describe("treasure-port-choose", () => {
  test("the first treasure map or survey report by slot with a known spot is taken", () => {
    const spots = spotsByItem([
      { itemId: 7, mapId: 30, x: 0.5, y: 0.5 },
      { itemId: 9, mapId: 31, x: 0.1, y: 0.2 },
    ])
    const found = firstKnownTreasure(
      [slot(12, 9, SPECIALIZED_SURVEY_REPORT), slot(4, 7, SPECIALIZED_TREASURE_MAP)],
      spots
    )
    expect(found?.slot.slotIndex).toBe(4)
    expect(found?.spots).toEqual([{ mapId: 30, x: 0.5, y: 0.5 }])
  })

  test("a treasure with no known spot is skipped", () => {
    const spots = spotsByItem([{ itemId: 9, mapId: 31, x: 0.1, y: 0.2 }])
    const found = firstKnownTreasure(
      [slot(1, 7, SPECIALIZED_TREASURE_MAP), slot(2, 9, SPECIALIZED_SURVEY_REPORT)],
      spots
    )
    expect(found?.slot.itemId).toBe(9)
  })

  test("an item that is neither a treasure map nor a survey report is never taken", () => {
    const spots = spotsByItem([{ itemId: 7, mapId: 30, x: 0.5, y: 0.5 }])
    expect(firstKnownTreasure([slot(1, 7, 3)], spots)).toBeUndefined()
  })

  test("an item keeps every distinct spot and drops repeats", () => {
    const spots = spotsByItem([
      { itemId: 7, mapId: 30, x: 0.5, y: 0.5 },
      { itemId: 7, mapId: 30, x: 0.5, y: 0.5 },
      { itemId: 7, mapId: 32, x: 0.3, y: 0.6 },
    ])
    expect(spots[7]).toEqual([
      { mapId: 30, x: 0.5, y: 0.5 },
      { mapId: 32, x: 0.3, y: 0.6 },
    ])
  })

  test("a spot on an inner map lands where the same place is on the outer map", () => {
    const [x, y] = reexpress(0.5, 0.5, CITY, ZONE)
    expect(x).toBeCloseTo(0.6)
    expect(y).toBeCloseTo(0.6)
  })

  test("distances on maps of different scale compare in one measure", () => {
    expect(universalDistance(0, 0, 0.5, 0, CITY)).toBeCloseTo(0.01)
    expect(universalDistance(0, 0, 0.1, 0, ZONE)).toBeCloseTo(0.01)
  })
})
