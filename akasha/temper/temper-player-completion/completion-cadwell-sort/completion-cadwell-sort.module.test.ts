import { describe, expect, test } from "bun:test"
import {
  type CadwellProgressInput,
  findFirstIncompleteCadwellZone,
  sortCadwellLevels,
  sortCadwellPois,
  sortCadwellZones,
} from "./completion-cadwell-sort.module.code.ts"

const AURIDON_POIS = {
  1: { name: "Tanzelwil", order: 2, completed: true },
  2: { name: "Firsthold", order: 5, completed: false },
  3: { name: "Skywatch", order: 4, completed: false },
  4: { name: "Vulkhel Guard", order: 1, completed: true },
  5: { name: "Mathiisen", order: 3, completed: false },
}

const GRAHTWOOD_POIS = {
  1: { name: "Elden Root", order: 1, completed: false },
  2: { name: "Haven", order: 2, completed: true },
}

const COLDHARBOUR_POIS = {
  1: { name: "Hollow City", order: 1, completed: true },
  2: { name: "The Endless Stair", order: 2, completed: true },
}

const PROGRESS: CadwellProgressInput = {
  levels: {
    0: {
      zones: {
        1: { name: "Auridon", order: 1, pois: AURIDON_POIS },
        2: { name: "Grahtwood", order: 2, pois: GRAHTWOOD_POIS },
      },
    },
    1: {
      zones: {
        10: { name: "Coldharbour", order: 1, pois: COLDHARBOUR_POIS },
      },
    },
  },
}

describe("sortCadwellPois", () => {
  test("sorts by order ascending, not by numeric key", () => {
    const sorted = sortCadwellPois(AURIDON_POIS)
    expect(sorted.map((p) => p.name)).toEqual([
      "Vulkhel Guard",
      "Tanzelwil",
      "Mathiisen",
      "Skywatch",
      "Firsthold",
    ])
  })

  test("preserves the numeric key as id", () => {
    const sorted = sortCadwellPois(AURIDON_POIS)
    const byName = Object.fromEntries(sorted.map((p) => [p.name, p.id]))
    expect(byName["Vulkhel Guard"]).toBe(4)
    expect(byName.Firsthold).toBe(2)
  })

  test("tie-breaks equal order by id ascending", () => {
    const sorted = sortCadwellPois({
      7: { name: "B", order: 1, completed: false },
      3: { name: "A", order: 1, completed: false },
    })
    expect(sorted.map((p) => p.id)).toEqual([3, 7])
  })

  test("returns nothing for an empty record", () => {
    expect(sortCadwellPois({})).toEqual([])
  })
})

describe("sortCadwellZones", () => {
  test("sorts zones by order and sorts their POIs", () => {
    const level0 = PROGRESS.levels[0]
    if (!level0) throw new Error("fixture missing")
    const sorted = sortCadwellZones(level0.zones)
    expect(sorted.map((z) => z.name)).toEqual(["Auridon", "Grahtwood"])
    expect(sorted[0]?.pois.map((p) => p.name)).toEqual([
      "Vulkhel Guard",
      "Tanzelwil",
      "Mathiisen",
      "Skywatch",
      "Firsthold",
    ])
  })
})

describe("sortCadwellLevels", () => {
  test("sorts levels ascending by numeric key", () => {
    const sorted = sortCadwellLevels(PROGRESS)
    expect(sorted.map((l) => l.id)).toEqual([0, 1])
  })

  test("returns nothing when there are no levels", () => {
    expect(sortCadwellLevels({ levels: {} })).toEqual([])
  })
})

describe("findFirstIncompleteCadwellZone", () => {
  test("returns the first zone in suggested order with at least one incomplete POI", () => {
    const result = findFirstIncompleteCadwellZone(PROGRESS)
    expect(result).toBeDefined()
    expect(result?.levelId).toBe(0)
    expect(result?.zoneId).toBe(1)
    expect(result?.zoneName).toBe("Auridon")
    expect(result?.incompletePoiNames).toEqual(["Mathiisen", "Skywatch", "Firsthold"])
    expect(result?.totalPois).toBe(5)
  })

  test("respects the level scope", () => {
    const result = findFirstIncompleteCadwellZone(PROGRESS, 1)
    expect(result).toBeUndefined()
  })

  test("skips fully-complete zones and returns a later one when needed", () => {
    const progress: CadwellProgressInput = {
      levels: {
        0: {
          zones: {
            1: {
              name: "DoneZone",
              order: 1,
              pois: { 1: { name: "x", order: 1, completed: true } },
            },
            2: {
              name: "NextZone",
              order: 2,
              pois: { 1: { name: "y", order: 1, completed: false } },
            },
          },
        },
      },
    }
    const result = findFirstIncompleteCadwellZone(progress)
    expect(result?.zoneName).toBe("NextZone")
    expect(result?.totalPois).toBe(1)
  })

  test("returns undefined when everything is complete", () => {
    const progress: CadwellProgressInput = {
      levels: {
        0: {
          zones: {
            1: {
              name: "Z",
              order: 1,
              pois: { 1: { name: "p", order: 1, completed: true } },
            },
          },
        },
      },
    }
    expect(findFirstIncompleteCadwellZone(progress)).toBeUndefined()
  })
})
