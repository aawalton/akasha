import { describe, expect, test } from "bun:test"
import type { SessionEnvelope } from "../client-envelope/client-envelope.module.code.ts"
import { decideFrontierAdvance, deriveContentFrontier } from "./content-frontier.module.code.ts"

const BASE: SessionEnvelope = { title: "A Game" }

describe("deriveContentFrontier", () => {
  test("is nothing when neither beats nor prose are asked for", () => {
    expect(deriveContentFrontier(BASE)).toBeUndefined()
  })

  test("is nothing where the beat log is null or empty", () => {
    expect(deriveContentFrontier({ ...BASE, beatLog: null })).toBeUndefined()
    expect(deriveContentFrontier({ ...BASE, beatLog: [] })).toBeUndefined()
  })

  test("names the count, the turn and the id of the newest beat", () => {
    const envelope: SessionEnvelope = {
      ...BASE,
      beatLog: [
        { type: "narrative", text: "first", turn: 1, id: "b1" },
        { type: "narrative", text: "second", turn: 2, id: "b2" },
      ],
    }
    expect(deriveContentFrontier(envelope)).toBe("beat:2:2:b2")
  })

  test("leaves the turn and the id blank where a beat carries neither", () => {
    const envelope: SessionEnvelope = { ...BASE, beatLog: [{ type: "narrative", text: "only" }] }
    expect(deriveContentFrontier(envelope)).toBe("beat:1::")
  })

  test("takes the beat log over the prose when both are there", () => {
    const envelope: SessionEnvelope = {
      ...BASE,
      beatLog: [{ type: "narrative", text: "b", turn: 3, id: 9 }],
      chapterProse: [{ id: "t1", title: "T", text: "x", turnNumber: 4 }],
    }
    expect(deriveContentFrontier(envelope)).toBe("beat:1:3:9")
  })

  test("names the id and the turn of the newest prose turn", () => {
    const envelope: SessionEnvelope = {
      ...BASE,
      chapterProse: [
        { id: "t1", title: "T", text: "x", turnNumber: 4 },
        { id: "t2", title: "U", text: "y", turnNumber: 5 },
      ],
    }
    expect(deriveContentFrontier(envelope)).toBe("prose:t2:5")
  })

  test("is nothing where the prose is asked for and empty", () => {
    expect(deriveContentFrontier({ ...BASE, chapterProse: [] })).toBeUndefined()
  })
})

describe("decideFrontierAdvance", () => {
  test("says no where there is no new token", () => {
    expect(decideFrontierAdvance("a", undefined)).toBe(false)
  })

  test("says no where the token is unchanged", () => {
    expect(decideFrontierAdvance("a", "a")).toBe(false)
  })

  test("says yes where the token differs", () => {
    expect(decideFrontierAdvance("a", "b")).toBe(true)
  })

  test("says yes on the first token seen", () => {
    expect(decideFrontierAdvance(undefined, "a")).toBe(true)
  })
})
