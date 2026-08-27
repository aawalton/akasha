import { describe, expect, test } from "bun:test"
import { deriveLogTurns } from "./backfill-turns"
import { wordCount } from "./word-count"

function narrative(turn: number, text: string, id?: string): Record<string, unknown> {
  return { type: "narrative", turn, text, ...(id !== undefined ? { id } : {}) }
}

function systemBeat(turn: number, id: string): Record<string, unknown> {
  return {
    type: "system",
    turn,
    id,
    mechanics: { poolChanges: [{ pool: "hp", delta: -3, newTotal: 17 }] },
  }
}

function chapter(title: string, startBeat: string, endBeat?: string): Record<string, unknown> {
  return { title, startBeat, ...(endBeat !== undefined ? { endBeat } : {}) }
}

describe("deriveLogTurns — grouping and prose", () => {
  test("narrative beats are grouped by turn and joined with a blank line", () => {
    const log = [
      narrative(60, "First beat.", "b100"),
      narrative(60, "Second beat.", "b101"),
      narrative(61, "Turn sixty-one.", "b102"),
    ]
    const { turns } = deriveLogTurns(log, [], { prefix: "the-tower" })
    expect(turns.map((t) => t.turnNumber)).toEqual([60, 61])
    expect(turns[0]?.text).toBe("First beat.\n\nSecond beat.")
    expect(turns[1]?.text).toBe("Turn sixty-one.")
  })

  test("system beats are excluded from the derived prose", () => {
    const log = [
      narrative(60, "Prose one.", "b100"),
      systemBeat(60, "b101"),
      narrative(60, "Prose two.", "b102"),
    ]
    const { turns } = deriveLogTurns(log, [], { prefix: "the-tower" })
    expect(turns).toHaveLength(1)
    expect(turns[0]?.text).toBe("Prose one.\n\nProse two.")
  })

  test("turnless beats are skipped", () => {
    const log = [{ type: "narrative", text: "No turn stamp." }, narrative(60, "Kept.", "b100")]
    const { turns } = deriveLogTurns(log, [], { prefix: "the-tower" })
    expect(turns).toHaveLength(1)
    expect(turns[0]?.turnNumber).toBe(60)
  })

  test("length is the canonical wordCount of the joined text", () => {
    const log = [narrative(60, "one two three", "b100"), narrative(60, "four five", "b101")]
    const { turns } = deriveLogTurns(log, [], { prefix: "the-tower" })
    const expected = wordCount("one two three\n\nfour five")
    expect(turns[0]?.length).toBe(expected)
    expect(turns[0]?.length).toBe(5)
  })

  test("externalId and turnNumber derive from the prefix and turn", () => {
    const log = [narrative(84, "The turn.", "b200")]
    const { turns } = deriveLogTurns(log, [], { prefix: "the-tower" })
    expect(turns[0]?.externalId).toBe("the-tower-t84")
    expect(turns[0]?.turnNumber).toBe(84)
  })
})

describe("deriveLogTurns — chapter mapping by beat range", () => {
  const chapters = [
    chapter("Chapter 3", "b100", "b199"),
    chapter("Chapter 4", "b200", "b299"),
    chapter("Chapter 5 (open)", "b300"),
  ]

  test("a turn whose first beat falls in ch4's range gets ch4's title + beat", () => {
    const log = [narrative(60, "In four.", "b210"), narrative(60, "More.", "b215")]
    const { turns } = deriveLogTurns(log, chapters, { prefix: "the-tower" })
    expect(turns[0]?.src).toEqual({ ch: "Chapter 4", beat: 210 })
  })

  test("the open chapter (no endBeat) contains its later beats", () => {
    const log = [narrative(70, "In five.", "b350")]
    const { turns } = deriveLogTurns(log, chapters, { prefix: "the-tower" })
    expect(turns[0]?.src).toEqual({ ch: "Chapter 5 (open)", beat: 350 })
  })

  test("a turn beyond all (closed) chapter ranges falls back to String(turnNumber)", () => {
    const closed = [chapter("Chapter 3", "b100", "b199"), chapter("Chapter 4", "b200", "b299")]
    const log = [narrative(88, "Out of range.", "b900")]
    const { turns } = deriveLogTurns(log, closed, { prefix: "the-tower" })
    expect(turns[0]?.src).toEqual({ ch: "88", beat: 900 })
  })

  test("a malformed/missing first-beat id omits beat and labels by turn number", () => {
    const log = [narrative(91, "No usable id.")]
    const { turns } = deriveLogTurns(log, chapters, { prefix: "the-tower" })
    expect(turns[0]?.src).toEqual({ ch: "91" })
    expect(turns[0]?.src.beat).toBeUndefined()
  })
})

describe("deriveLogTurns — range filter and skipped gaps", () => {
  const log = [
    narrative(58, "Fifty-eight.", "b100"),
    narrative(59, "Fifty-nine.", "b101"),
    systemBeat(60, "b102"),
    narrative(61, "Sixty-one.", "b103"),
    narrative(63, "Sixty-three.", "b104"),
  ]

  test("from/to restrict the derived turns to the requested range", () => {
    const { turns } = deriveLogTurns(log, [], { prefix: "g", from: 59, to: 61 })
    expect(turns.map((t) => t.turnNumber)).toEqual([59, 61])
  })

  test("skipped lists the integers in [from,to] with no derived turn", () => {
    const { skipped } = deriveLogTurns(log, [], { prefix: "g", from: 58, to: 63 })
    expect(skipped).toEqual([60, 62])
  })

  test("skipped is empty when the range is unbounded", () => {
    const { skipped } = deriveLogTurns(log, [], { prefix: "g" })
    expect(skipped).toEqual([])
  })
})
