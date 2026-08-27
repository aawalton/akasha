import { describe, expect, test } from "bun:test"
import type { SessionEnvelope } from "./client-envelope"
import { decideFrontierAdvance, deriveContentFrontier } from "./content-frontier"

type Turn = { id: string; title: string; text: string; turnNumber?: number }
type Beat = { type: "narrative"; id?: string | number; turn?: number; text: string }

function proseEnvelope(turns: readonly Turn[]): SessionEnvelope {
  return { title: "Test", chapterProse: [...turns] }
}
function beatEnvelope(beats: readonly Beat[] | null): SessionEnvelope {
  return { title: "Test", beatLog: beats === null ? null : [...beats] }
}

const TURN_1: Turn = { id: "t1", title: "One", text: "hello", turnNumber: 1 }
const TURN_2: Turn = { id: "t2", title: "Two", text: "world", turnNumber: 2 }

describe("deriveContentFrontier — chapterProse (turn-fed)", () => {
  test("empty prose → undefined (game not begun)", () => {
    expect(deriveContentFrontier(proseEnvelope([]))).toBeUndefined()
  })

  test("a turn present → a defined token carrying the turn id", () => {
    const token = deriveContentFrontier(proseEnvelope([TURN_1]))
    expect(token).toBeDefined()
    expect(token).toContain("t1")
  })

  test("a NEW freshest turn changes the token", () => {
    const a = deriveContentFrontier(proseEnvelope([TURN_1]))
    const b = deriveContentFrontier(proseEnvelope([TURN_1, TURN_2]))
    expect(a).not.toBe(b)
  })

  test("SAME turn id with growing prose keeps the SAME token (one alert per turn, no stream spam)", () => {
    const short = deriveContentFrontier(
      proseEnvelope([{ id: "t1", title: "One", text: "he", turnNumber: 1 }])
    )
    const grown = deriveContentFrontier(
      proseEnvelope([{ id: "t1", title: "One", text: "hello there, adventurer", turnNumber: 1 }])
    )
    expect(short).toBe(grown)
  })
})

describe("deriveContentFrontier — beatLog (state-fed)", () => {
  test("null beatLog → undefined (no live state yet)", () => {
    expect(deriveContentFrontier(beatEnvelope(null))).toBeUndefined()
  })

  test("empty beatLog → undefined", () => {
    expect(deriveContentFrontier(beatEnvelope([]))).toBeUndefined()
  })

  test("a beat present → a defined token", () => {
    expect(
      deriveContentFrontier(beatEnvelope([{ type: "narrative", id: 5, turn: 1, text: "a" }]))
    ).toBeDefined()
  })

  test("appending a beat advances the token", () => {
    const one = deriveContentFrontier(
      beatEnvelope([{ type: "narrative", id: 5, turn: 1, text: "a" }])
    )
    const two = deriveContentFrontier(
      beatEnvelope([
        { type: "narrative", id: 5, turn: 1, text: "a" },
        { type: "narrative", id: 6, turn: 2, text: "b" },
      ])
    )
    expect(one).not.toBe(two)
  })

  test("an appended beat with no id still advances (length carries it)", () => {
    const one = deriveContentFrontier(beatEnvelope([{ type: "narrative", turn: 1, text: "a" }]))
    const two = deriveContentFrontier(
      beatEnvelope([
        { type: "narrative", turn: 1, text: "a" },
        { type: "narrative", turn: 1, text: "b" },
      ])
    )
    expect(one).not.toBe(two)
  })

  test("beatLog wins over chapterProse when both sections are present", () => {
    const env: SessionEnvelope = {
      title: "Test",
      beatLog: [{ type: "narrative", id: 9, turn: 3, text: "z" }],
      chapterProse: [TURN_1],
    }
    expect(deriveContentFrontier(env)).toContain("beat:")
  })
})

describe("decideFrontierAdvance", () => {
  test("mount with pre-existing content fires nothing (next === seeded prev)", () => {
    const t = deriveContentFrontier(proseEnvelope([TURN_1]))
    expect(decideFrontierAdvance(t, t)).toBe(false)
  })

  test("a live advance fires (prev !== next, next defined)", () => {
    expect(decideFrontierAdvance("prose:t1:1", "prose:t2:2")).toBe(true)
  })

  test("no-change does not fire", () => {
    expect(decideFrontierAdvance("prose:t1:1", "prose:t1:1")).toBe(false)
  })

  test("mount on an empty game fires nothing (both undefined)", () => {
    expect(decideFrontierAdvance(undefined, undefined)).toBe(false)
  })

  test("empty→content observed live DOES fire (prev undefined, next defined)", () => {
    expect(decideFrontierAdvance(undefined, "prose:t1:1")).toBe(true)
  })

  test("content→empty does not fire (next undefined)", () => {
    expect(decideFrontierAdvance("prose:t1:1", undefined)).toBe(false)
  })
})
