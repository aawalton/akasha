import { describe, expect, test } from "bun:test"
import {
  type ConditionReading,
  type NodeReading,
  nearestTarget,
  objectiveCondition,
  portTargets,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"

function node(overrides: Partial<NodeReading>): NodeReading {
  return {
    nodeIndex: 1,
    name: "Shrine",
    kind: "wayshrine",
    known: true,
    shownOnMap: true,
    locked: false,
    outboundOnly: false,
    houseId: 0,
    houseOwned: false,
    x: 0.5,
    y: 0.5,
    ...overrides,
  }
}

function condition(overrides: Partial<ConditionReading>): ConditionReading {
  return {
    stepIndex: 1,
    conditionIndex: 1,
    isVisible: true,
    isFailCondition: false,
    isComplete: false,
    ...overrides,
  }
}

describe("quest-port-choose", () => {
  test("the objective is the first visible condition neither failed nor complete", () => {
    const found = objectiveCondition([
      condition({ conditionIndex: 1, isComplete: true }),
      condition({ conditionIndex: 2, isVisible: false }),
      condition({ conditionIndex: 3, isFailCondition: true }),
      condition({ conditionIndex: 4 }),
      condition({ conditionIndex: 5 }),
    ])
    expect(found?.conditionIndex).toBe(4)
  })

  test("a step with every condition done has no objective", () => {
    expect(objectiveCondition([condition({ isComplete: true })])).toBeUndefined()
  })

  test("a known wayshrine on the map is a target", () => {
    expect(portTargets([node({ nodeIndex: 7 })])).toEqual([
      { kind: "wayshrine", nodeIndex: 7, houseId: 0, name: "Shrine", x: 0.5, y: 0.5 },
    ])
  })

  test("an unknown wayshrine is never a target", () => {
    expect(portTargets([node({ known: false })])).toEqual([])
  })

  test("a node off the map, locked, or outbound only is never a target", () => {
    expect(
      portTargets([
        node({ shownOnMap: false }),
        node({ locked: true }),
        node({ outboundOnly: true }),
      ])
    ).toEqual([])
  })

  test("an owned house is a target and a house not owned is not", () => {
    const targets = portTargets([
      node({ nodeIndex: 3, kind: "house", known: false, houseId: 40, houseOwned: true }),
      node({ nodeIndex: 4, kind: "house", houseId: 41, houseOwned: false }),
    ])
    expect(targets.map((target) => [target.kind, target.houseId])).toEqual([["house", 40]])
  })

  test("a node that is neither a wayshrine nor a house is never a target", () => {
    expect(portTargets([node({ kind: "other" })])).toEqual([])
  })

  test("the nearest target is nearest by straight-line distance on the map", () => {
    const targets = portTargets([
      node({ nodeIndex: 1, x: 0.1, y: 0.1 }),
      node({ nodeIndex: 2, x: 0.6, y: 0.5 }),
      node({ nodeIndex: 3, kind: "house", houseId: 9, houseOwned: true, x: 0.5, y: 0.45 }),
    ])
    expect(nearestTarget(targets, 0.5, 0.5)?.nodeIndex).toBe(3)
  })

  test("of two targets equally near, the first is taken", () => {
    const targets = portTargets([
      node({ nodeIndex: 1, x: 0.4, y: 0.5 }),
      node({ nodeIndex: 2, x: 0.6, y: 0.5 }),
    ])
    expect(nearestTarget(targets, 0.5, 0.5)?.nodeIndex).toBe(1)
  })

  test("no target gives no nearest", () => {
    expect(nearestTarget([], 0.5, 0.5)).toBeUndefined()
  })
})
