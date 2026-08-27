import { describe, expect, test } from "bun:test"
import { computeTally, TallyCatalogError } from "../tally"
import type { TallyCatalog } from "../tally-catalog"
import { BOUNDARY_CATALOG, BOUNDARY_LENS, bTurn, CATALOG } from "./fixtures"

describe("computeTally — boundary lens: real-corpus classification", () => {
  const REAL = [
    bTurn("You decide the dark mouth itself is the place to learn. The forge is not yet lit.", 57),
    bTurn(
      "Then you climb — up the cleared floor, past the dead Sentinel's rubble. The kill is marked.",
      56
    ),
    bTurn("[natalie] There it is. Careful, the dish is still hot. [natalie] In a minute.", 1),
    bTurn(
      "The stew had been on since noon, and by the time they came in it had thickened. She stayed in her chair.",
      3
    ),
  ]
  const r = computeTally(REAL, BOUNDARY_CATALOG)
  const b = (i: number) => {
    const bd = r.perTurn[i]?.boundary
    if (bd === undefined) throw new Error(`no boundary at ${i}`)
    return bd
  }

  test("You-initial perception head (tower t57)", () => {
    expect(b(0).headCategory).toBe("perception")
    expect(b(0).youInitial).toBe(true)
    expect(b(0).headSample).toBe("You decide the dark mouth itself is the place to learn.")
    expect(b(0).closeState).toBe("poised")
  })

  test("continuation-opener head is in-motion, not You-initial (tower t56)", () => {
    expect(b(1).headCategory).toBe("in-motion")
    expect(b(1).youInitial).toBe(false)
    expect(b(1).closeState).toBe("resolved")
  })

  test("speaker-tag head + close are dialogue (violet t1)", () => {
    expect(b(2).headCategory).toBe("dialogue")
    expect(b(2).youInitial).toBe(false)
    expect(b(2).closeState).toBe("dialogue")
  })

  test("scene-setting head falls back to ambient-reestablish (violet t3)", () => {
    expect(b(3).headCategory).toBe("ambient-reestablish")
    expect(b(3).youInitial).toBe(false)
  })
})

describe("computeTally — boundary lens: cross-turn run rollup", () => {
  const RUN = [
    bTurn("You climb the stair. It is not yet done.", 1),
    bTurn("You climb higher. Still not yet.", 2),
    bTurn("You climb again. Resting now.", 3),
    bTurn("The room is quiet. The fire is out.", 4),
    bTurn("[mari] Stay. [mari] In a minute.", 5),
    bTurn("You see the dark. You notice the cold.", 6),
  ]
  const r = computeTally(RUN, BOUNDARY_CATALOG)
  const bc = r.cumulative.boundary
  if (bc === undefined) throw new Error("no boundary cumulative")

  test("runThreshold echoed", () => {
    expect(bc.runThreshold).toBe(3)
  })

  test("head longest run is the action×3 streak; uniform runs are only K>=3", () => {
    expect(bc.head.longestRun).toMatchObject({
      category: "action",
      length: 3,
      fromTurnNumber: 1,
      toTurnNumber: 3,
    })
    expect(bc.head.uniformRuns).toHaveLength(1)
    expect(bc.head.uniformRuns[0]).toMatchObject({ category: "action", length: 3 })
  })

  test("head buckets count per category in first-appearance order", () => {
    expect(bc.head.buckets.map((x) => [x.category, x.turns])).toEqual([
      ["action", 3],
      ["ambient-reestablish", 1],
      ["dialogue", 1],
      ["perception", 1],
    ])
  })

  test("close has no K>=3 uniform run (poised×2, resolved×2)", () => {
    expect(bc.close.uniformRuns).toHaveLength(0)
    expect(bc.close.longestRun).toMatchObject({ category: "poised", length: 2 })
  })

  test("You-initial column surfaces RUNS ONLY — you-initial-labeled, no 'other', no rate", () => {
    expect(bc.youInitial.longestRun).toMatchObject({ category: "you-initial", length: 3 })
    expect(bc.youInitial.uniformRuns).toHaveLength(1)
    expect(bc.youInitial.uniformRuns.every((x) => x.category === "you-initial")).toBe(true)
    expect("buckets" in bc.youInitial).toBe(false)
  })
})

describe("computeTally — boundary lens: opt-in + failure", () => {
  test("a catalog WITHOUT boundaryLens emits NO boundary keys (byte-identical opt-in)", () => {
    const r = computeTally([bTurn("You climb. Done.", 1)], CATALOG)
    expect(r.perTurn[0] && "boundary" in r.perTurn[0]).toBe(false)
    expect("boundary" in r.cumulative).toBe(false)
  })

  test("an invalid boundary screen regex throws TallyCatalogError naming the screen", () => {
    const bad: TallyCatalog = {
      ...BOUNDARY_CATALOG,
      boundaryLens: {
        ...BOUNDARY_LENS,
        head: {
          fallback: "action",
          screens: [{ category: "x", regex: "(unclosed", provenance: "p" }],
        },
      },
    }
    expect(() => computeTally([bTurn("You climb. Done.", 1)], bad)).toThrow(TallyCatalogError)
    expect(() => computeTally([bTurn("You climb. Done.", 1)], bad)).toThrow(/head:x/)
  })
})
