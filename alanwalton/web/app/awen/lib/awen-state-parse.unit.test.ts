import { describe, expect, test } from "bun:test"
import { parseAwenStatePage } from "./awen-state-parse"

describe("parseAwenStatePage — null→undefined boundary coercion", () => {
  test("a crunchy state with null build/chapters parses (does not throw)", () => {
    const state = parseAwenStatePage({
      turn: 3,
      hud: { level: 4, pools: { vitae: 42 } },
      revealed: { name: "Aldric" },
      build: null,
      log: [{ type: "narrative", text: "x" }],
      chapters: null,
      quests: null,
    })
    expect(state.turn).toBe(3)
    expect(state.build).toBeUndefined()
    expect(state.chapters).toBeUndefined()
    expect(state.hud?.pools).toEqual({ vitae: 42 })
  })

  test("a turn-0 state with every optional field null parses to just turn", () => {
    const state = parseAwenStatePage({
      turn: 0,
      hud: null,
      revealed: null,
      build: null,
      log: null,
      chapters: null,
      quests: null,
    })
    expect(state.turn).toBe(0)
    expect(state.hud).toBeUndefined()
    expect(state.revealed).toBeUndefined()
    expect(state.log).toBeUndefined()
    expect(state.build).toBeUndefined()
    expect(state.chapters).toBeUndefined()
  })
})
