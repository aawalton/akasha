import { describe, expect, test } from "bun:test"
import { asPage, type Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  PLAYED_ROWS_DRAWN,
  playedChaptersOf,
  playedClockOf,
  playedCoversOf,
  playedEnvelope,
  playedHrefsOf,
  playedMaking,
  playedReady,
  playedTail,
  playedTitleOf,
  playedTurnsOf,
  playedUpcomingOf,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import { turnStatus } from "akasha/story/world/stories/played/turns/turn-status/turn-status.page-type.ts"

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

describe("playedCoversOf", () => {
  test("carries every turn's cover with its number, in the turns' order, drawn or not", () => {
    const rows = turnsNumbering(PLAYED_ROWS_DRAWN + 2).map((row) =>
      turnPage({ id: row.id, position: row.position, cover: `image/${row.id}` })
    )
    const covers = playedCoversOf([], rows)
    expect(covers).toHaveLength(PLAYED_ROWS_DRAWN + 2)
    expect(covers[0]).toEqual({ id: "id-0", number: 1, cover: "image/id-0" })
  })

  test("passes over a turn stating no cover, and numbers a turn stating no position by its place", () => {
    const rows = [
      turnPage({ id: "b", position: 2 }),
      turnPage({ id: "loose", cover: "image/loose" }),
      turnPage({ id: "a", position: 1, cover: "image/a" }),
    ]
    expect(playedCoversOf([], rows)).toEqual([
      { id: "a", number: 1, cover: "image/a" },
      { id: "loose", number: 3, cover: "image/loose" },
    ])
  })

  test("carries the covers each chapter kept, chapters in order, before the open turns' covers", () => {
    const chapter = (id: string, position: number, turnCovers: unknown): Page =>
      asPage({ pageTypeSlug: "story-chapter-played", id, position, turnCovers })
    const chapters = [
      chapter("c2", 2, [{ position: 3, cover: "image/three" }]),
      chapter("c1", 1, [{ position: 1, cover: "image/one" }, { position: 2 }]),
    ]
    const open = [turnPage({ id: "t4", position: 4, cover: "image/four" })]
    expect(playedCoversOf(chapters, open)).toEqual([
      { id: "c1:1", number: 1, cover: "image/one" },
      { id: "c2:3", number: 3, cover: "image/three" },
      { id: "t4", number: 4, cover: "image/four" },
    ])
  })
})

describe("playedReady and playedMaking", () => {
  const at = (step: string): string => `${turnStatus.slug}/${step}`
  const read = turnPage({ id: "a", slug: "saga-01", position: 1, turnStatus: at("player") })
  const making = turnPage({
    id: "b",
    slug: "saga-02",
    position: 2,
    turnStatus: at("reviewers"),
    action: "I open the gate",
  })

  test("a turn not yet at player is kept from the reader", () => {
    expect(playedReady([making, read]).map((row) => row.id)).toEqual(["a"])
  })

  test("a turn stating no status is read as ready", () => {
    expect(playedReady([turnPage({ id: "c", position: 1 })])).toHaveLength(1)
  })

  test("the latest turn, while it is being made, says its action and its step", () => {
    expect(playedMaking([making, read])).toEqual({
      slug: "saga-02",
      action: "I open the gate",
      step: "reviewers",
    })
  })

  test("a turn whose recorders are still working is kept from the reader and is being made", () => {
    const recording = turnPage({
      id: "b",
      slug: "saga-02",
      position: 2,
      turnStatus: at("recorders"),
      action: "I open the gate",
    })
    expect(playedReady([recording, read]).map((row) => row.id)).toEqual(["a"])
    expect(playedMaking([recording, read])?.step).toBe("recorders")
  })

  test("nothing is being made once the latest turn is at player", () => {
    expect(playedMaking([read])).toBeNull()
    expect(playedMaking([])).toBeNull()
  })
})

describe("playedClockOf", () => {
  test("says the in-game day and clock time the latest ready turn ends at", () => {
    const rows = [
      turnPage({ id: "b", position: 2, endsAt: "2026-09-26T11:42:00.000Z" }),
      turnPage({ id: "a", position: 1, endsAt: "2026-09-26T09:05:00.000Z" }),
    ]
    expect(playedClockOf(rows)).toBe("Saturday, September 26 · 11:42 AM")
  })

  test("says nothing where the latest ready turn states no end time", () => {
    const rows = [
      turnPage({ id: "a", position: 1, endsAt: "2026-09-26T09:05:00.000Z" }),
      turnPage({ id: "b", position: 2 }),
    ]
    expect(playedClockOf(rows)).toBeNull()
    expect(playedClockOf([])).toBeNull()
  })
})

describe("playedUpcomingOf", () => {
  const ready = [turnPage({ id: "t", position: 1, endsAt: "2026-09-26T12:04:00.000Z" })]
  const meeting = (id: string, appointmentAt: string): Page =>
    asPage({ pageTypeSlug: "world-appointment", id, title: `Meet ${id}`, appointmentAt })

  test("lists the appointments after the latest turn's end time, soonest first", () => {
    const rows = [
      meeting("late", "2026-10-10T19:00:00.000Z"),
      meeting("past", "2026-09-26T09:00:00.000Z"),
      meeting("soon", "2026-10-03T11:00:00.000Z"),
    ]
    expect(playedUpcomingOf(rows, ready)).toEqual([
      { id: "soon", when: "Saturday, October 3 · 11:00 AM", title: "Meet soon" },
      { id: "late", when: "Saturday, October 10 · 7:00 PM", title: "Meet late" },
    ])
  })

  test("lists nothing where the turns carry no time", () => {
    const rows = [meeting("soon", "2026-10-03T11:00:00.000Z")]
    expect(playedUpcomingOf(rows, [turnPage({ id: "t", position: 1 })])).toEqual([])
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

describe("playedEnvelope", () => {
  test("names the story and carries every turn as prose", () => {
    const envelope = playedEnvelope({
      title: "Harem Hotel",
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
      turns: [],
      chapters: [{ id: "c1", title: "Chapter 1", href: "/story-chapter-played/c1-00000001" }],
      state: null,
    })
    expect(envelope.storySoFar?.map((chapter) => chapter.title)).toEqual(["Chapter 1"])
  })

  test("holds every section a panel reads, and no beat log or action box", () => {
    const envelope = playedEnvelope({
      title: "Partners",
      turns: [],
      chapters: [],
      state: null,
    })
    expect(envelope.hud).toBeNull()
    expect(envelope.quests).toBeNull()
    expect(envelope.sheet).toBeNull()
    expect(envelope.storySoFar).toEqual([])
    expect(envelope.beatLog).toBeUndefined()
    expect(envelope.actionBox).toBeUndefined()
  })
})
