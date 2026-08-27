import { describe, expect, test } from "bun:test"
import { GAME_ENGINES, isGameEngine, selectGameRenderMode } from "./game-engine"

describe("GAME_ENGINES", () => {
  test("is the canonical engine option set for the `game` page type", () => {
    expect([...GAME_ENGINES]).toEqual(["awen", "idle", "chess"])
  })
})

describe("isGameEngine", () => {
  test("accepts known engine values", () => {
    expect(isGameEngine("awen")).toBe(true)
    expect(isGameEngine("idle")).toBe(true)
    expect(isGameEngine("chess")).toBe(true)
  })
  test("rejects unknown values", () => {
    expect(isGameEngine("tower")).toBe(false)
    expect(isGameEngine("")).toBe(false)
  })
})

describe("selectGameRenderMode", () => {
  test("idle engine renders the idle SPA", () => {
    expect(selectGameRenderMode({ gameEngine: "idle", externalId: null })).toBe("idle")
    expect(selectGameRenderMode({ gameEngine: "idle", externalId: "x" })).toBe("idle")
  })

  test("chess engine renders the chessground board", () => {
    expect(selectGameRenderMode({ gameEngine: "chess", externalId: null })).toBe("chess")
    expect(selectGameRenderMode({ gameEngine: "chess", externalId: "x" })).toBe("chess")
  })

  test("awen engine with a launchable externalId renders the awen player", () => {
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: "the-tower" })).toBe("awen")
  })

  test("awen engine without an externalId falls through to generic detail", () => {
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: null })).toBe("generic")
    expect(selectGameRenderMode({ gameEngine: "awen", externalId: "" })).toBe("generic")
  })

  test("missing gameEngine reads as awen (backward-compat)", () => {
    expect(selectGameRenderMode({ gameEngine: null, externalId: "the-tower" })).toBe("awen")
    expect(selectGameRenderMode({ gameEngine: undefined, externalId: "the-tower" })).toBe("awen")
    expect(selectGameRenderMode({ gameEngine: null, externalId: null })).toBe("generic")
  })

  test("unrecognized engine value degrades to generic detail", () => {
    expect(selectGameRenderMode({ gameEngine: "tower", externalId: "x" })).toBe("generic")
  })
})
