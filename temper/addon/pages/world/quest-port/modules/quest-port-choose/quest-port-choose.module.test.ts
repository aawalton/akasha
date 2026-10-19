import { describe, expect, test } from "bun:test"
import {
  climbForTargets,
  instanceTarget,
  MAX_TARGET_CLIMBS,
  mapAttempts,
  type NodeReading,
  namesakeNodes,
  nearestTarget,
  portTargets,
  type StepReading,
} from "akasha/temper/addon/pages/world/quest-port/modules/quest-port-choose/quest-port-choose.module.code.ts"

function node(overrides: Partial<NodeReading>): NodeReading {
  return {
    nodeIndex: 1,
    name: "Shrine",
    kind: "wayshrine",
    poiType: 1,
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

function step(stepIndex: number, complete: readonly boolean[], isEnding = false): StepReading {
  return {
    stepIndex,
    isEnding,
    conditions: complete.map((isComplete, at) => ({ conditionIndex: at + 1, isComplete })),
  }
}

function named(attempts: ReturnType<typeof mapAttempts>): string[] {
  return attempts.map((attempt) =>
    attempt.kind === "ending"
      ? `ending ${attempt.stepIndex}`
      : `${attempt.stepIndex}.${attempt.conditionIndex}`
  )
}

describe("quest-port-choose", () => {
  test("every unfinished condition of every step is tried, in journal order", () => {
    expect(named(mapAttempts([step(1, [false, false]), step(2, [false, false, false])]))).toEqual([
      "1.1",
      "1.2",
      "2.1",
      "2.2",
      "2.3",
    ])
  })

  test("a step's ending is tried after that step's unfinished conditions", () => {
    expect(named(mapAttempts([step(1, [false], true), step(2, [false])]))).toEqual([
      "1.1",
      "ending 1",
      "2.1",
    ])
  })

  test("finished conditions are tried only after every unfinished one and every ending", () => {
    expect(named(mapAttempts([step(1, [true, false]), step(2, [true], true)]))).toEqual([
      "1.2",
      "ending 2",
      "1.1",
      "2.1",
    ])
  })

  test("a quest with no step has nothing to try", () => {
    expect(mapAttempts([])).toEqual([])
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

  test("the found way into an instance is the node of the instance's name", () => {
    expect(
      instanceTarget(
        [
          node({ nodeIndex: 2, name: "Fungal Grotto I", kind: "wayshrine" }),
          node({ nodeIndex: 5, name: "Fungal Grotto I", kind: "other", shownOnMap: false }),
        ],
        "fungal grotto i"
      )
    ).toEqual({
      kind: "instance",
      nodeIndex: 5,
      houseId: 0,
      name: "Fungal Grotto I",
      x: 0.5,
      y: 0.5,
    })
  })

  test("an instance's way in that is unknown, locked or outbound only is no target", () => {
    expect(
      instanceTarget(
        [
          node({ name: "Spindleclutch I", kind: "other", known: false }),
          node({ name: "Spindleclutch I", kind: "other", locked: true }),
          node({ name: "Spindleclutch I", kind: "other", outboundOnly: true }),
        ],
        "Spindleclutch I"
      )
    ).toBeUndefined()
  })

  test("an instance no node is named for has no target", () => {
    expect(instanceTarget([node({ name: "Spindleclutch I", kind: "other" })], "")).toBeUndefined()
    expect(
      instanceTarget([node({ name: "Spindleclutch I", kind: "other" })], "Bad Man's Hallows")
    ).toBeUndefined()
  })

  test("a node neither wayshrine nor house sharing a word with the instance is a namesake", () => {
    const namesakes = namesakeNodes(
      [
        node({ nodeIndex: 1, name: "Direfrost Keep", kind: "other" }),
        node({ nodeIndex: 2, name: "Direfrost Keep Wayshrine", kind: "wayshrine" }),
        node({ nodeIndex: 3, name: "Keep of the Direfrost", kind: "other" }),
        node({ nodeIndex: 4, name: "Fungal Grotto I", kind: "other" }),
      ],
      "Direfrost Keep",
      5
    )
    expect(namesakes.map((namesake) => namesake.nodeIndex)).toEqual([1, 3])
  })

  test("words shorter than four letters make no namesake", () => {
    expect(
      namesakeNodes([node({ name: "Crypt of Hearts I", kind: "other" })], "Ruins of Mazzatun", 5)
    ).toEqual([])
  })

  test("namesakes stop at the count asked for", () => {
    const nodes = [1, 2, 3].map((nodeIndex) =>
      node({ nodeIndex, name: "Spindleclutch", kind: "other" })
    )
    expect(namesakeNodes(nodes, "Spindleclutch II", 2)).toHaveLength(2)
  })

  test("a map inside an overland map is zoomed out of to look for targets", () => {
    expect(climbForTargets(false, 0)).toBe(true)
  })

  test("an overland map is never zoomed out of to look for targets", () => {
    expect(climbForTargets(true, 0)).toBe(false)
  })

  test("zooming out to look for targets stops at the cap", () => {
    expect(climbForTargets(false, MAX_TARGET_CLIMBS)).toBe(false)
  })
})
