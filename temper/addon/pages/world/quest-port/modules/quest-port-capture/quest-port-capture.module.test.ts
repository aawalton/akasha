import { describe, expect, test } from "bun:test"
import {
  closestCandidates,
  keepLast,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-capture/quest-port-capture.module.code.ts"
import type { PortTarget } from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"

function target(overrides: Partial<PortTarget>): PortTarget {
  return {
    kind: "wayshrine",
    nodeIndex: 1,
    houseId: 0,
    name: "Shrine",
    x: 0.5,
    y: 0.5,
    ...overrides,
  }
}

describe("quest-port-capture", () => {
  test("a list under the cap keeps every record and adds the new one last", () => {
    expect(keepLast([1, 2], 3, 5)).toEqual([1, 2, 3])
  })

  test("a full list drops its oldest record for the new one", () => {
    expect(keepLast([1, 2, 3], 4, 3)).toEqual([2, 3, 4])
  })

  test("keeping a record leaves the list handed in as it was", () => {
    const list = [1, 2]
    keepLast(list, 3, 2)
    expect(list).toEqual([1, 2])
  })

  test("the closest candidates come nearest first with their distance", () => {
    const found = closestCandidates(
      [
        target({ nodeIndex: 1, x: 0.5, y: 0.9 }),
        target({ nodeIndex: 2, x: 0.5, y: 0.6 }),
        target({ nodeIndex: 3, kind: "house", houseId: 7, x: 0.5, y: 0.8 }),
      ],
      0.5,
      0.5,
      2
    )
    expect(found.map((one) => one.nodeIndex)).toEqual([2, 3])
    expect(found[0]?.distance).toBeCloseTo(0.1)
    expect(found[1]?.houseId).toBe(7)
  })

  test("no target gives no candidate", () => {
    expect(closestCandidates([], 0.5, 0.5, 5)).toEqual([])
  })
})
