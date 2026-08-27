import { describe, expect, test } from "bun:test"
import { selectPageDisplayKind } from "./page-display-kind"

describe("selectPageDisplayKind — config-driven (detailConfig.display)", () => {
  test("a 'game' display dispatches through selectGameRenderMode (awen/idle/chess)", () => {
    expect(
      selectPageDisplayKind({ configDisplay: "game", gameEngine: "idle", externalId: null })
    ).toBe("idle")
    expect(
      selectPageDisplayKind({ configDisplay: "game", gameEngine: "chess", externalId: null })
    ).toBe("chess")
    expect(
      selectPageDisplayKind({ configDisplay: "game", gameEngine: "awen", externalId: "the-tower" })
    ).toBe("awen")
  })

  test("a 'game' display awen without externalId degrades to generic (delegated)", () => {
    expect(
      selectPageDisplayKind({ configDisplay: "game", gameEngine: "awen", externalId: null })
    ).toBe("generic")
  })

  test("chess-review / persona / question displays resolve directly from config", () => {
    expect(
      selectPageDisplayKind({ configDisplay: "chess-review", gameEngine: null, externalId: null })
    ).toBe("chess-review")
    expect(
      selectPageDisplayKind({ configDisplay: "persona", gameEngine: null, externalId: null })
    ).toBe("persona")
    expect(
      selectPageDisplayKind({ configDisplay: "question", gameEngine: null, externalId: null })
    ).toBe("question")
  })

  test("a built-in display (reader/collection/default) is generic on this seam", () => {
    for (const display of ["reader", "collection", "default"]) {
      expect(
        selectPageDisplayKind({ configDisplay: display, gameEngine: null, externalId: null })
      ).toBe("generic")
    }
  })

  test("no declared display → generic (the legacy slug fallback is retired, #15569)", () => {
    expect(
      selectPageDisplayKind({ configDisplay: undefined, gameEngine: null, externalId: null })
    ).toBe("generic")
    expect(selectPageDisplayKind({ configDisplay: null, gameEngine: null, externalId: null })).toBe(
      "generic"
    )
  })

  test("an unrecognized custom display slug is generic", () => {
    expect(
      selectPageDisplayKind({ configDisplay: "no-such-kind", gameEngine: null, externalId: null })
    ).toBe("generic")
  })
})
