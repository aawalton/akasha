import { describe, expect, test } from "bun:test"
import { deriveLogTurns } from "./backfill-turns.module.code.ts"

const narrative = (turn: number, text: string, id?: string | number) => ({
  type: "narrative",
  text,
  turn,
  ...(id !== undefined ? { id } : {}),
})

describe("deriveLogTurns", () => {
  test("one narrative beat becomes one turn", () => {
    const { turns } = deriveLogTurns([narrative(1, "a first beat")], [], { prefix: "g" })
    expect(turns).toHaveLength(1)
    expect(turns[0]?.externalId).toBe("g-t1")
    expect(turns[0]?.turnNumber).toBe(1)
    expect(turns[0]?.text).toBe("a first beat")
    expect(turns[0]?.length).toBe(3)
  })

  test("beats sharing a turn are joined in log order", () => {
    const { turns } = deriveLogTurns([narrative(1, "one"), narrative(1, "two")], [], {
      prefix: "g",
    })
    expect(turns).toHaveLength(1)
    expect(turns[0]?.text).toBe("one\n\ntwo")
  })

  test("system beats are not narrative and are left out", () => {
    const { turns } = deriveLogTurns(
      [narrative(1, "prose"), { type: "system", turn: 1, title: "Level up" }],
      [],
      { prefix: "g" }
    )
    expect(turns).toHaveLength(1)
    expect(turns[0]?.text).toBe("prose")
  })

  test("a beat the schema refuses is skipped rather than thrown on", () => {
    const { turns } = deriveLogTurns([{ type: "narrative", text: "  ", turn: 1 }], [], {
      prefix: "g",
    })
    expect(turns).toEqual([])
  })

  test("a beat with no turn stamp is left out", () => {
    const { turns } = deriveLogTurns([{ type: "narrative", text: "loose" }], [], { prefix: "g" })
    expect(turns).toEqual([])
  })

  test("turns come back in turn-number order", () => {
    const { turns } = deriveLogTurns(
      [narrative(3, "c"), narrative(1, "a"), narrative(2, "b")],
      [],
      {
        prefix: "g",
      }
    )
    expect(turns.map((t) => t.turnNumber)).toEqual([1, 2, 3])
  })

  test("the span bounds which turns are derived", () => {
    const { turns } = deriveLogTurns(
      [narrative(1, "a"), narrative(2, "b"), narrative(3, "c")],
      [],
      { prefix: "g", from: 2, to: 3 }
    )
    expect(turns.map((t) => t.turnNumber)).toEqual([2, 3])
  })

  test("a turn number in the span the log has nothing under is reported skipped", () => {
    const { skipped } = deriveLogTurns([narrative(2, "b")], [], { prefix: "g", from: 1, to: 4 })
    expect(skipped).toEqual([1, 3, 4])
  })

  test("nothing is reported skipped without a bounded span", () => {
    const { skipped } = deriveLogTurns([narrative(2, "b")], [], { prefix: "g" })
    expect(skipped).toEqual([])
  })

  test("a beat falling in a chapter range is filed under that chapter", () => {
    const chapters = [
      { title: "Opening", startBeat: "beat-1", endBeat: "beat-9" },
      { title: "Descent", startBeat: 10 },
    ]
    const { turns } = deriveLogTurns(
      [narrative(1, "a", "beat-4"), narrative(2, "b", 12)],
      chapters,
      { prefix: "g" }
    )
    expect(turns[0]?.src).toEqual({ ch: "Opening", beat: 4 })
    expect(turns[1]?.src).toEqual({ ch: "Descent", beat: 12 })
  })

  test("a beat under no chapter is filed under its own turn number", () => {
    const { turns } = deriveLogTurns([narrative(7, "a", "beat-7")], [], { prefix: "g" })
    expect(turns[0]?.src).toEqual({ ch: "7", beat: 7 })
  })

  test("a beat with no id carries no beat number", () => {
    const { turns } = deriveLogTurns([narrative(7, "a")], [], { prefix: "g" })
    expect(turns[0]?.src).toEqual({ ch: "7" })
  })

  test("a chapter the schema refuses is passed over", () => {
    const { turns } = deriveLogTurns([narrative(1, "a", "beat-1")], [{ title: "No start" }], {
      prefix: "g",
    })
    expect(turns[0]?.src).toEqual({ ch: "1", beat: 1 })
  })
})
