import { describe, expect, test } from "bun:test"
import {
  TREASURE_PORT_SAVED_VARIABLES,
  treasurePressesIn,
  treasurePressLines,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-treasure-reading/quest-port-treasure-reading.module.code.ts"

const MAP = {
  name: "Glenumbra",
  mapId: 3,
  mapType: 2,
  contentType: 0,
  zoneIndex: 1,
  zoneName: "Glenumbra",
}

const ROOT = {
  Default: {
    "@Alanarre": {
      $AccountWide: {
        treasurePortTrace: {
          "1": {
            at: 600,
            character: "Maviola El",
            slotIndex: 14,
            itemId: 43695,
            itemName: "Glenumbra Treasure Map I",
            spots: [{ mapId: 3, x: 0.25, y: 0.5 }],
            mapBefore: MAP,
            mapSteps: [{ step: "set-to-map 3", result: 1, map: MAP }],
            nodesRead: 640,
            candidatesKept: 9,
            target: {
              kind: "wayshrine",
              name: "Daggerfall Wayshrine",
              nodeIndex: 2,
              houseId: 0,
              x: 0.3,
              y: 0.5,
              distance: 0.05,
            },
            said: ["Porting to Daggerfall Wayshrine, nearest to Glenumbra Treasure Map I."],
          },
        },
      },
    },
  },
}

describe("quest-port-treasure-reading", () => {
  test("a treasure press shows its item, its spots, the map steps and what was said", () => {
    const presses = treasurePressesIn(TREASURE_PORT_SAVED_VARIABLES.parse(ROOT))
    const press = presses[0]
    if (press === undefined) throw new Error("no treasure press read")
    const lines = treasurePressLines(press)
    expect(lines[0]).toBe(
      't=600 treasure press by Maviola El: slot 14 item 43695 "Glenumbra Treasure Map I"'
    )
    expect(lines[1]).toBe("    spots: map 3 (0.25, 0.5)")
    expect(lines.join("\n")).toContain("set-to-map 3 -> 1")
    expect(lines.join("\n")).toContain('target: wayshrine "Daggerfall Wayshrine"')
    expect(lines.at(-1)).toBe(
      "    said: Porting to Daggerfall Wayshrine, nearest to Glenumbra Treasure Map I."
    )
  })

  test("a table with no treasure press reads as none", () => {
    expect(treasurePressesIn(TREASURE_PORT_SAVED_VARIABLES.parse({ Default: {} }))).toEqual([])
  })
})
