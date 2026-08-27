import { describe, expect, test } from "bun:test"
import { type GameDisplayModules } from "@alanwalton/awen-core/game-schema"
import { GameStateSchema } from "@alanwalton/awen-core/state-schema"
import { SessionEnvelopeSchema } from "./client-envelope"
import { assertEnvelopeMatchesModules, composeSessionEnvelope } from "./session-envelope"
import { CRUNCHY_MODULES, STATE, STORY, STORY_MODULES } from "./session-envelope.test-helpers"

describe("loop-dark — the GM-role surface can never ride the client envelope (#14309)", () => {
  const GM_KEYS = ["gmContext", "gmReference"] as const

  test("composed envelope never carries a GM key, for EITHER game's modules", () => {
    for (const modules of [STORY_MODULES, CRUNCHY_MODULES]) {
      const envelope = composeSessionEnvelope("Game", modules, { state: STATE, story: STORY })
      for (const key of GM_KEYS) {
        expect(Object.keys(envelope)).not.toContain(key)
      }
    }
  })

  test("the strict boundary schema REJECTS an envelope with a GM key injected", () => {
    for (const key of GM_KEYS) {
      const injected = { title: "Tower", beatLog: null, [key]: { policies: [] } }
      expect(() => SessionEnvelopeSchema.parse(injected)).toThrow()
    }
  })
})

describe("loop-dark — the honest-randomness roll log can never ride the client envelope (#14413)", () => {
  const ROLL_KEYS = ["rolls", "rollLog", "seed"] as const

  test("composed envelope never carries a roll-surface key, for EITHER game's modules", () => {
    for (const modules of [STORY_MODULES, CRUNCHY_MODULES]) {
      const envelope = composeSessionEnvelope("Game", modules, { state: STATE, story: STORY })
      for (const key of ROLL_KEYS) {
        expect(Object.keys(envelope)).not.toContain(key)
      }
    }
  })

  test("the strict boundary schema REJECTS an envelope with a roll-surface key injected", () => {
    for (const key of ROLL_KEYS) {
      const injected = { title: "Tower", beatLog: null, [key]: [{ seed: "deadbeef" }] }
      expect(() => SessionEnvelopeSchema.parse(injected)).toThrow()
    }
  })
})

describe("loop-dark — the DESIGNED-truth store can never ride the client envelope (#15324)", () => {
  const DESIGN_KEYS = ["design", "designEntries", "gameDesign"] as const

  test("composed envelope never carries a design-surface key, for EITHER game's modules", () => {
    for (const modules of [STORY_MODULES, CRUNCHY_MODULES]) {
      const envelope = composeSessionEnvelope("Game", modules, { state: STATE, story: STORY })
      for (const key of DESIGN_KEYS) {
        expect(Object.keys(envelope)).not.toContain(key)
      }
    }
  })

  test("the strict boundary schema REJECTS an envelope with a design-surface key injected", () => {
    for (const key of DESIGN_KEYS) {
      const injected = { title: "Tower", beatLog: null, [key]: [{ challenge: "secret" }] }
      expect(() => SessionEnvelopeSchema.parse(injected)).toThrow()
    }
  })
})

describe("loop-dark — the data reveal-spec can only NARROW within the code universe (#15337)", () => {
  const RICH_STATE = GameStateSchema.parse({
    turn: 1,
    revealed: { name: "Aldric", level: 3, attributes: { might: 5 }, skills: [{ name: "Guard" }] },
  })
  const sheetOnly = (revealKeys?: readonly string[]): GameDisplayModules => ({
    sheet: revealKeys === undefined ? {} : { revealKeys: [...revealKeys] },
  })

  test("an unselected universe key is stripped from the composed sheet (subtractive)", () => {
    const envelope = composeSessionEnvelope("Game", sheetOnly(["name", "level"]), {
      state: RICH_STATE,
      story: null,
    })
    expect(envelope.sheet).not.toBeNull()
    expect(envelope.sheet?.name).toBe("Aldric")
    expect(envelope.sheet?.level).toBe(3)
    expect(envelope.sheet?.attributes).toBeUndefined()
    expect(envelope.sheet?.skills).toBeUndefined()
  })

  test("no revealKeys declared → the whole universe (today's show-everything)", () => {
    const envelope = composeSessionEnvelope("Game", sheetOnly(), {
      state: RICH_STATE,
      story: null,
    })
    expect(envelope.sheet?.name).toBe("Aldric")
    expect(envelope.sheet?.attributes).toEqual({ might: 5 })
  })

  test("THE FLOOR: a spec listing GM/non-universe keys can never surface them", () => {
    const envelope = composeSessionEnvelope(
      "Game",
      sheetOnly(["name", "traits", "designerNotes", "hiddenDcs"]),
      { state: RICH_STATE, story: null }
    )
    const keys = Object.keys(envelope.sheet ?? {})
    expect(keys).not.toContain("traits")
    expect(keys).not.toContain("designerNotes")
    expect(keys).not.toContain("hiddenDcs")
    expect(envelope.sheet?.name).toBe("Aldric")
  })
})

describe("assertEnvelopeMatchesModules — fail-loud drift guard", () => {
  test("declared module with a missing section throws, naming the module", () => {
    expect(() => assertEnvelopeMatchesModules(CRUNCHY_MODULES, { title: "Tower" })).toThrow(
      /"beatLog" is declared but its section is missing/
    )
  })

  test("undeclared module with a present section throws", () => {
    expect(() =>
      assertEnvelopeMatchesModules(STORY_MODULES, {
        title: "Dragons",
        chapterProse: [],
        storySoFar: [],
        hud: null,
      })
    ).toThrow(/"hud" is undeclared but its section is present/)
  })

  test("a null section still counts as present (declared beatLog with no live state passes)", () => {
    expect(() =>
      assertEnvelopeMatchesModules(
        { beatLog: {}, actionBox: {} },
        { title: "Tower", beatLog: null, actionBox: [] }
      )
    ).not.toThrow()
  })

  test("exact match across every declared permutation passes", () => {
    for (const modules of [STORY_MODULES, CRUNCHY_MODULES]) {
      const envelope = composeSessionEnvelope("Game", modules, { state: STATE, story: STORY })
      expect(() => assertEnvelopeMatchesModules(modules, envelope)).not.toThrow()
    }
  })
})
