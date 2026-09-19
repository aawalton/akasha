import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  PLAYED_ROWS_DRAWN,
  panelsDrawnHere,
  playedChaptersOf,
  playedEnvelope,
  playedHrefsOf,
  playedTail,
  playedTitleOf,
  playedTurnsOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"

const NO_PROSE: ReadonlyMap<string, string> = new Map()

const turnPage = (values: Record<string, unknown>): Page =>
  asPage({ pageTypeSlug: "story-turn-played", ...values })

const turnsNumbering = (count: number): readonly Page[] =>
  Array.from({ length: count }, (_unused, at) => turnPage({ id: `id-${at}`, position: at + 1 }))

describe("playedTurnsOf", () => {
  test("orders the turns by the position each states", () => {
    const turns = playedTurnsOf(
      [turnPage({ id: "b", position: 2 }), turnPage({ id: "a", position: 1 })],
      NO_PROSE
    )
    expect(turns.map((turn) => turn.id)).toEqual(["a", "b"])
    expect(turns.map((turn) => turn.turnNumber)).toEqual([1, 2])
  })

  test("puts a turn stating no position after every turn that states one", () => {
    const turns = playedTurnsOf(
      [turnPage({ id: "loose" }), turnPage({ id: "first", position: 1 })],
      NO_PROSE
    )
    expect(turns.map((turn) => turn.id)).toEqual(["first", "loose"])
    expect(turns[1]?.turnNumber).toBeUndefined()
  })

  test("carries the prose handed for a turn", () => {
    const prose = new Map([["a", "It begins."]])
    expect(playedTurnsOf([turnPage({ id: "a", position: 1 })], prose)[0]?.text).toBe("It begins.")
  })

  test("carries no prose where none was handed for that turn", () => {
    expect(playedTurnsOf([turnPage({ id: "a", position: 1 })], NO_PROSE)[0]?.text).toBe("")
  })
})

describe("playedTitleOf", () => {
  test("names a turn with no title of its own by its position", () => {
    expect(playedTitleOf(turnPage({ id: "a", position: 7 }))).toBe("Turn 7")
  })

  test("keeps the title a chapter states", () => {
    expect(playedTitleOf(turnPage({ id: "a", position: 7, title: "The Kin-Fire" }))).toBe(
      "The Kin-Fire"
    )
  })

  test("names a turn stating neither title nor position", () => {
    expect(playedTitleOf(turnPage({ id: "a" }))).toBe("Untitled")
  })
})

describe("playedTail", () => {
  test("draws every turn of a story shorter than the tail", () => {
    const tail = playedTail(turnsNumbering(5))
    expect(tail.drawn.length).toBe(5)
    expect(tail.earlier).toBe(0)
  })

  test("counts the turns before the tail rather than drawing them", () => {
    const tail = playedTail(turnsNumbering(PLAYED_ROWS_DRAWN + 12))
    expect(tail.drawn.length).toBe(PLAYED_ROWS_DRAWN)
    expect(tail.earlier).toBe(12)
    expect(tail.drawn[0]?.id).toBe("id-12")
  })
})

describe("playedHrefsOf", () => {
  test("reaches a turn by its slug and the tail of its id", () => {
    const hrefs = playedHrefsOf("story-turn-played", [
      turnPage({ id: "0000000000abcdef", slug: "harem-hotel-01-001", position: 1 }),
    ])
    expect(hrefs.get("0000000000abcdef")).toBe("/story-turn-played/harem-hotel-01-001-00abcdef")
  })
})

describe("playedChaptersOf", () => {
  test("links each chapter to its own page and numbers it by position", () => {
    const chapters = playedChaptersOf([
      turnPage({ id: "0000000000abcdef", slug: "d-and-d-0001", title: "The Key", position: 1 }),
    ])
    expect(chapters[0]?.href).toBe("/story-chapter-played/d-and-d-0001-00abcdef")
    expect(chapters[0]?.chapterNumber).toBe(1)
    expect(chapters[0]?.title).toBe("The Key")
  })
})

describe("panelsDrawnHere", () => {
  test("leaves out the action box a game declares", () => {
    expect(panelsDrawnHere({ actionBox: {}, chapterProse: {} })).toEqual({ chapterProse: {} })
  })

  test("keeps every other panel a game declares", () => {
    const declared = {
      hud: { pools: [] },
      sheet: {},
      quests: {},
      beatLog: { systemWindows: true },
      storySoFar: { source: "turns" as const },
      chapterProse: { history: "full" as const },
    }
    expect(panelsDrawnHere(declared)).toEqual(declared)
  })

  test("draws prose alone for a story no game names", () => {
    expect(panelsDrawnHere(null)).toEqual({ chapterProse: {} })
  })

  test("draws prose for a game that declares every panel but that one", () => {
    expect(panelsDrawnHere({ beatLog: {} })).toEqual({ chapterProse: {}, beatLog: {} })
  })
})

describe("playedEnvelope", () => {
  test("names the story and carries every turn as prose", () => {
    const envelope = playedEnvelope({
      title: "Harem Hotel",
      modules: { chapterProse: {} },
      turns: playedTurnsOf(turnsNumbering(3), NO_PROSE),
      chapters: [],
      state: null,
    })
    expect(envelope.title).toBe("Harem Hotel")
    expect(envelope.chapterProse?.map((turn) => turn.id)).toEqual(["id-0", "id-1", "id-2"])
  })

  test("carries the chapters handed it where the story so far reads turns", () => {
    const envelope = playedEnvelope({
      title: "Dragons and Dungeons",
      modules: { storySoFar: { source: "turns" } },
      turns: [],
      chapters: [{ id: "c1", title: "Chapter 1", href: "/story-chapter-played/c1-00000001" }],
      state: null,
    })
    expect(envelope.storySoFar?.map((chapter) => chapter.title)).toEqual(["Chapter 1"])
  })

  test("holds no panel section for a game that declares none", () => {
    const envelope = playedEnvelope({
      title: "Partners",
      modules: { chapterProse: {} },
      turns: [],
      chapters: [],
      state: null,
    })
    expect(envelope.hud).toBeUndefined()
    expect(envelope.quests).toBeUndefined()
    expect(envelope.beatLog).toBeUndefined()
  })
})
