import { describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  camelised,
  camelisedRow,
  rowsBeside,
  rowsText,
  turnedRows,
} from "./akasha-day.module.code.ts"

const PAGE =
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.ts"

const HELD = [
  { id: "one", title: "Sleep", startTime: "a" },
  { id: "two", title: "Work", startTime: "b" },
]

describe("the spelling a value takes on its way into akasha", () => {
  test("every key becomes camel, whichever way the caller spelled it", () => {
    expect(camelised({ "inbox-tasks": 22, id: "x", inboxTexts: 4 })).toEqual({
      inboxTasks: 22,
      id: "x",
      inboxTexts: 4,
    })
  })

  test("nothing carries a value the caller did not state", () => {
    expect(camelised({ id: "x", title: null, date: undefined })).toEqual({ id: "x" })
  })

  test("a row is camel too, because that is what its entry property declares", () => {
    expect(camelisedRow({ "start-time": "a", "daily-tracking": "b" })).toEqual({
      startTime: "a",
      dailyTracking: "b",
    })
  })

  test("rows are written one to a line, and no rows is no text", () => {
    expect(rowsText(HELD)).toBe(`${JSON.stringify(HELD[0])}\n${JSON.stringify(HELD[1])}\n`)
    expect(rowsText([])).toBe("")
  })
})

describe("one row beside a day, turned", () => {
  test("a row is written onto the end", () => {
    const turned = turnedRows("write-row", HELD, { id: "three", title: "Read" }, "", "sessions")
    expect("refused" in turned).toBe(false)
    if ("refused" in turned) return
    expect(turned.rows).toHaveLength(3)
    expect(turned.rows[2]).toEqual({ id: "three", title: "Read" })
  })

  test("a row states an identity or nothing could ever amend it", () => {
    const turned = turnedRows("write-row", HELD, { title: "Read" }, "", "sessions")
    expect(turned).toEqual({ refused: "a row states no identity, so nothing could ever amend it" })
  })

  test("one session is one row, so a second write of the same identity refuses", () => {
    const turned = turnedRows("write-row", HELD, { id: "one" }, "", "sessions")
    expect("refused" in turned).toBe(true)
  })

  test("an amendment merges onto the row it names and leaves the rest alone", () => {
    const turned = turnedRows("patch-row", HELD, { "end-time": "z" }, "one", "sessions")
    expect("refused" in turned).toBe(false)
    if ("refused" in turned) return
    expect(turned.rows[0]).toEqual({ id: "one", title: "Sleep", startTime: "a", endTime: "z" })
    expect(turned.rows[1]).toEqual(HELD[1] as Record<string, unknown>)
  })

  test("taking a row away leaves the others in the order they stood", () => {
    const turned = turnedRows("remove-row", HELD, {}, "one", "sessions")
    expect("refused" in turned).toBe(false)
    if ("refused" in turned) return
    expect(turned.rows).toEqual([HELD[1] as Record<string, unknown>])
  })

  test("a row that is not there refuses rather than doing nothing", () => {
    expect("refused" in turnedRows("patch-row", HELD, {}, "nine", "sessions")).toBe(true)
    expect("refused" in turnedRows("remove-row", HELD, {}, "nine", "sessions")).toBe(true)
  })
})

describe("the rows a file beside a page holds", () => {
  test("a file that is not there holds none, and one that is holds what it says", () => {
    const root = mkdtempSync(join(tmpdir(), "akasha-day-"))
    try {
      expect(rowsBeside(root, PAGE, "sessions")).toEqual([])
      const at = join(
        root,
        "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl"
      )
      Bun.spawnSync([
        "mkdir",
        "-p",
        join(root, "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05"),
      ])
      writeFileSync(at, rowsText(HELD))
      expect(rowsBeside(root, PAGE, "sessions")).toEqual(HELD)
    } finally {
      rmSync(root, { recursive: true, force: true })
    }
  })

  test("a path that is no page file refuses rather than naming a file beside nothing", () => {
    expect(
      rowsBeside("/", "pages/daily-tracking/2026-03-05.daily-tracking.md", "sessions")
    ).toEqual({
      refused:
        "'pages/daily-tracking/2026-03-05.daily-tracking.md' is no page file, so nothing stands beside it",
    })
  })
})
