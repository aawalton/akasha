import { describe, expect, test } from "bun:test"
import { validateGameConfig } from "./game-config-schema.module.code.ts"

const SOUND = {
  externalId: "g1",
  title: "A Game",
  coordinatorAgent: "gm",
  mechanicsWeight: "light",
  controlledEntityKind: "single",
  resolution: "none",
  displayConfig: { modules: {}, pollMs: 2000 },
}

const fields = (input: Record<string, unknown>) => {
  const read = validateGameConfig(input)
  return read.ok ? [] : read.violations.map((v) => v.field)
}

describe("validateGameConfig", () => {
  test("a sound config is admitted and comes back parsed", () => {
    const read = validateGameConfig(SOUND)
    expect(read.ok).toBe(true)
    if (!read.ok) return
    expect(read.value.externalId).toBe("g1")
    expect(read.value.displayConfig.pollMs).toBe(2000)
  })

  test("a missing required field is reported under its name", () => {
    const { externalId: dropped, ...without } = SOUND
    expect(dropped).toBeDefined()
    expect(fields(without)).toEqual(["externalId"])
  })

  test("every fault is reported at once rather than the first alone", () => {
    const found = fields({ ...SOUND, title: "", coordinatorAgent: "" })
    expect(found).toEqual(["title", "coordinatorAgent"])
  })

  test("a game that rolls must declare how it resolves", () => {
    expect(fields({ ...SOUND, resolution: "dice" })).toEqual(["resolutionMechanism"])
    expect(fields({ ...SOUND, resolution: "hybrid" })).toEqual(["resolutionMechanism"])
  })

  test("a game that rolls and declares its mechanism is admitted", () => {
    const read = validateGameConfig({
      ...SOUND,
      resolution: "dice",
      resolutionMechanism: { verb: "strike", defaultDice: "2d6" },
    })
    expect(read.ok).toBe(true)
  })

  test("a game that never rolls must declare no mechanism", () => {
    expect(fields({ ...SOUND, resolutionMechanism: { verb: "strike" } })).toEqual([
      "resolutionMechanism",
    ])
  })

  test("a resolution kind between the two carries no such duty", () => {
    expect(validateGameConfig({ ...SOUND, resolution: "formula" }).ok).toBe(true)
  })

  test("a nested display config fault is reported by its path", () => {
    expect(fields({ ...SOUND, displayConfig: { modules: {}, pollMs: 0 } })).toEqual([
      "displayConfig.pollMs",
    ])
  })

  test("a mechanics weight the code does not name is refused", () => {
    expect(fields({ ...SOUND, mechanicsWeight: "crushing" })).toEqual(["mechanicsWeight"])
  })

  test("a shape fault and a coherence fault are reported together", () => {
    const found = fields({ ...SOUND, title: "", resolution: "dice" })
    expect(found).toEqual(["title", "resolutionMechanism"])
  })
})
