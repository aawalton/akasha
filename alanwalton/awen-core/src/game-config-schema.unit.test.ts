import { describe, expect, test } from "bun:test"
import { type GameConfigInput, validateGameConfig } from "./game-config-schema"

const VALID_DISPLAY = {
  modules: { actionBox: {}, storySoFar: { source: "turns" }, chapterProse: {} },
  pollMs: 4000,
}

const VALID: GameConfigInput = {
  externalId: "test-game",
  title: "Test Game",
  coordinatorAgent: "iris",
  mechanicsWeight: "zero",
  controlledEntityKind: "single",
  resolution: "none",
  displayConfig: VALID_DISPLAY,
}

function fieldsOf(result: ReturnType<typeof validateGameConfig>): readonly string[] {
  return result.ok ? [] : result.violations.map((v) => v.field)
}

describe("validateGameConfig", () => {
  test("a minimal valid game passes and returns the typed value", () => {
    const result = validateGameConfig(VALID)
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error("expected ok")
    expect(result.value.externalId).toBe("test-game")
    expect(result.value.resolution).toBe("none")
    expect(result.value.displayConfig.pollMs).toBe(4000)
  })

  test("a valid hybrid game WITH a resolutionMechanism passes", () => {
    const result = validateGameConfig({
      ...VALID,
      mechanicsWeight: "medium",
      resolution: "hybrid",
      resolutionMechanism: { verb: "roll", defaultDice: "1d20" },
      genre: ["litrpg", "adventure"],
    })
    expect(result.ok).toBe(true)
    if (!result.ok) throw new Error("expected ok")
    expect(result.value.resolutionMechanism?.verb).toBe("roll")
    expect(result.value.genre).toEqual(["litrpg", "adventure"])
  })

  test("ALL missing required fields surface together in one report", () => {
    const result = validateGameConfig({})
    expect(result.ok).toBe(false)
    const fields = fieldsOf(result)
    for (const required of [
      "externalId",
      "title",
      "coordinatorAgent",
      "mechanicsWeight",
      "controlledEntityKind",
      "resolution",
      "displayConfig",
    ]) {
      expect(fields).toContain(required)
    }
  })

  test("resolution dice/hybrid WITHOUT a mechanism is a coherence violation", () => {
    for (const resolution of ["dice", "hybrid"] as const) {
      const result = validateGameConfig({ ...VALID, resolution })
      expect(result.ok).toBe(false)
      expect(fieldsOf(result)).toContain("resolutionMechanism")
    }
  })

  test('resolution "none" WITH a mechanism is a coherence violation', () => {
    const result = validateGameConfig({
      ...VALID,
      resolution: "none",
      resolutionMechanism: { verb: "roll" },
    })
    expect(result.ok).toBe(false)
    expect(fieldsOf(result)).toContain("resolutionMechanism")
  })

  test("resolution formula needs no mechanism (Tower shape)", () => {
    const result = validateGameConfig({ ...VALID, mechanicsWeight: "heavy", resolution: "formula" })
    expect(result.ok).toBe(true)
  })

  test("a field fault AND a coherence fault report together (complete single pass)", () => {
    const result = validateGameConfig({
      ...VALID,
      resolution: "dice",
      displayConfig: { modules: {} },
    })
    expect(result.ok).toBe(false)
    const fields = fieldsOf(result)
    expect(fields).toContain("resolutionMechanism")
    expect(fields.some((f) => f.startsWith("displayConfig"))).toBe(true)
  })

  test("an invalid displayConfig (missing pollMs) fails loud at creation", () => {
    const result = validateGameConfig({ ...VALID, displayConfig: { modules: { actionBox: {} } } })
    expect(result.ok).toBe(false)
    expect(fieldsOf(result).some((f) => f.startsWith("displayConfig"))).toBe(true)
  })

  test("an out-of-vocabulary genre value is rejected", () => {
    const result = validateGameConfig({ ...VALID, genre: ["litrpg", "not-a-genre"] })
    expect(result.ok).toBe(false)
    expect(fieldsOf(result).some((f) => f.startsWith("genre"))).toBe(true)
  })

  test("an invalid enum dial is rejected", () => {
    const result = validateGameConfig({ ...VALID, mechanicsWeight: "gigantic" })
    expect(result.ok).toBe(false)
    expect(fieldsOf(result)).toContain("mechanicsWeight")
  })

  test("a malformed resolutionMechanism shape is rejected", () => {
    const result = validateGameConfig({
      ...VALID,
      resolution: "hybrid",
      mechanicsWeight: "medium",
      resolutionMechanism: { defaultDice: "1d20" },
    })
    expect(result.ok).toBe(false)
    expect(fieldsOf(result).some((f) => f.startsWith("resolutionMechanism"))).toBe(true)
  })
})
