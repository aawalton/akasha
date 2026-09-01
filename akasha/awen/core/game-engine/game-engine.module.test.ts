import { describe, expect, test } from "bun:test"
import { isGameEngine, selectGameRenderMode } from "./game-engine.module.code.ts"

describe("isGameEngine", () => {
  test("names the three engines", () => {
    expect(isGameEngine("awen")).toBe(true)
    expect(isGameEngine("idle")).toBe(true)
    expect(isGameEngine("chess")).toBe(true)
  })

  test("refuses an engine the code does not know", () => {
    expect(isGameEngine("roulette")).toBe(false)
  })
})

describe("selectGameRenderMode", () => {
  test("an unknown engine draws the plain screen", () => {
    expect(selectGameRenderMode({ gameEngine: "roulette", externalId: "g1" })).toBe("generic")
  })

  test("idle and chess draw their own screens whatever the external id", () => {
    expect(selectGameRenderMode({ gameEngine: "idle", externalId: null })).toBe("idle")
    expect(selectGameRenderMode({ gameEngine: "chess", externalId: "" })).toBe("chess")
  })

  test("an awen game with an external id draws the awen screen", () => {
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: "g1" })).toBe("awen")
  })

  test("an awen game with no external id draws the plain screen", () => {
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: null })).toBe("generic")
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: "" })).toBe("generic")
  })

  test("a missing engine is read as awen", () => {
    expect(selectGameRenderMode({ gameEngine: null, externalId: "g1" })).toBe("awen")
    expect(selectGameRenderMode({ gameEngine: undefined, externalId: null })).toBe("generic")
  })
})
