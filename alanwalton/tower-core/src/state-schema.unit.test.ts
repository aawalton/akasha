import { describe, expect, it } from "bun:test"
import { parseIllustrations, parseTowerState } from "./state-schema"

const HUD = { level: 1, hp: 10, hpMax: 10, focus: 10, focusMax: 10, stamina: 10, stamMax: 10 }
const SHEET = {
  attributes: {
    MIGHT: 10,
    FINESSE: 10,
    VITALITY: 10,
    INTELLECT: 10,
    PERCEPTION: 10,
    WILL: 10,
    PRESENCE: 10,
    LUCK: 10,
  },
}

describe("parseIllustrations", () => {
  it("parses a well-formed illustrations roster", () => {
    const raw = JSON.stringify([
      {
        anchor: "b37",
        src: "illustrations/b37-the-fall.png",
        alt: "the fall",
        caption: "He fell.",
      },
      { anchor: "b41", src: "illustrations/b41-the-gate.png" },
    ])
    const ills = parseIllustrations(raw)
    expect(ills).toHaveLength(2)
    expect(ills[0]?.anchor).toBe("b37")
    expect(ills[0]?.src).toBe("illustrations/b37-the-fall.png")
    expect(ills[1]?.alt).toBeUndefined()
  })

  it("tolerates and preserves unknown keys (passthrough)", () => {
    const raw = JSON.stringify([{ anchor: "b1", src: "x.png", width: 1024 }])
    const ills = parseIllustrations(raw)
    expect(ills[0]).toMatchObject({ anchor: "b1", src: "x.png", width: 1024 })
  })

  it("parses an empty roster", () => {
    expect(parseIllustrations("[]")).toEqual([])
  })

  it("throws on a missing required field", () => {
    expect(() => parseIllustrations(JSON.stringify([{ anchor: "b1" }]))).toThrow()
  })

  it("throws on a non-array document", () => {
    expect(() => parseIllustrations(JSON.stringify({ anchor: "b1", src: "x.png" }))).toThrow()
  })
})

describe("parseTowerState — heroBeat", () => {
  function stateWith(chapterOver: Record<string, unknown>): string {
    return JSON.stringify({
      title: "The Tower",
      turn: 1,
      hud: HUD,
      sheet: SHEET,
      log: [],
      chapters: [
        { number: 1, title: "C", floor: 1, startBeat: "b0", status: "closed", ...chapterOver },
      ],
    })
  }

  it("parses an optional heroBeat on a chapter entry", () => {
    const state = parseTowerState(stateWith({ heroBeat: "b37" }))
    expect(state.chapters[0]?.heroBeat).toBe("b37")
  })

  it("leaves heroBeat undefined when absent", () => {
    const state = parseTowerState(stateWith({}))
    expect(state.chapters[0]?.heroBeat).toBeUndefined()
  })
})

describe("parseTowerState — collapsed archived entries", () => {
  it("parses an archived entry that has no startBeat", () => {
    const raw = JSON.stringify({
      title: "The Tower",
      turn: 1,
      hud: HUD,
      sheet: SHEET,
      log: [],
      chapters: [
        {
          number: 1,
          title: "The Threshold",
          floor: 1,
          status: "archived",
          chapterId: "019efbd1-d698-7000-8000-000000000000",
          readerLink: "/story-chapter/the-threshold-93b884b2",
        },
      ],
    })
    const state = parseTowerState(raw)
    expect(state.chapters[0]?.status).toBe("archived")
    expect(state.chapters[0]?.startBeat).toBeUndefined()
  })
})
