import { afterEach, describe, expect, test } from "bun:test"
import { mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { besideAt } from "@akasha/pages-system/page-file-name"
import {
  attachmentFileOf,
  attachmentPathFor,
} from "../markdown-attachment-file/markdown-attachment-file.module.code.ts"
import {
  partNumberOf,
  rowsFileOf,
  rowsNamingOf,
  rowsPartOf,
  rowsPartsOf,
} from "./markdown-rows-file.module.code.ts"

const MARKDOWN_DAY = "pages/daily-tracking/2026-03-05.daily-tracking.md"

const AKASHA_DAY =
  "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.ts"

describe("what stands beside a page", () => {
  test("a markdown page's rows drop `.md`", () => {
    expect(rowsFileOf(MARKDOWN_DAY, "sessions")).toBe(
      "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl"
    )
  })

  test("an akasha page's rows drop `.ts`, and never carry it into the name", () => {
    const at = rowsFileOf(AKASHA_DAY, "sessions")
    expect(at).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.jsonl"
    )
    expect(at).not.toContain(".ts.")
  })

  test("the name is akasha's own, rather than a second copy of the rule", () => {
    // `besideAt` answers null for a path it cannot name, so the comparison is
    // widened to hold that: a null here fails the test rather than the compile.
    expect<string | null>(rowsFileOf(AKASHA_DAY, "sessions")).toBe(
      besideAt(AKASHA_DAY, "sessions", "jsonl")
    )
    expect<string | null>(rowsFileOf(AKASHA_DAY, "completed-tasks")).toBe(
      besideAt(AKASHA_DAY, "completed-tasks", "jsonl")
    )
  })

  test("rows kept outside the commit are named the same way in both halves", () => {
    expect(rowsFileOf(MARKDOWN_DAY, "sessions", true)).toBe(
      "pages/daily-tracking/2026-03-05.daily-tracking.sessions.uncommitted.jsonl"
    )
    expect(rowsFileOf(AKASHA_DAY, "sessions", true)).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.sessions.uncommitted.jsonl"
    )
  })

  test("an attachment drops the page's own extension in both halves", () => {
    expect(attachmentFileOf(MARKDOWN_DAY, "notes", "md")).toBe(
      "pages/daily-tracking/2026-03-05.daily-tracking.notes.attachment.md"
    )
    expect(attachmentFileOf(AKASHA_DAY, "notes", "md")).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05/day-2026-03-05.daily-tracking.notes.attachment.md"
    )
  })

  /**
   * The gate in front of every attachment read and write asked whether the path ended `.md`, which
   * is half of what the call above answers, so it refused the akasha half of a corpus the call
   * beneath it names correctly. Both now ask `besideAt` the one question.
   */
  test("the gate names a page of either kind rather than refusing the akasha one", () => {
    expect(attachmentPathFor(MARKDOWN_DAY, "notes", "md")).toBe(
      attachmentFileOf(MARKDOWN_DAY, "notes", "md")
    )
    expect(attachmentPathFor(AKASHA_DAY, "notes", "md")).toBe(
      attachmentFileOf(AKASHA_DAY, "notes", "md")
    )
  })

  test("a path naming no page of either kind is still refused", () => {
    expect(() => attachmentPathFor("pages/daily-tracking", "notes", "md")).toThrow()
    expect(() => attachmentPathFor("README", "notes", "md")).toThrow()
  })
})

/**
 * A property divided across parts, which is the shape the entry ceiling forces on a large sweep.
 *
 * The item mine's sweep is 155,440 rows in 24 files, and every reader that spelled the convention
 * for itself rather than asking here dropped 23 of them. These cases pin the spelling that the
 * catalog sidecars, the page removal and the fidelity reader all now read it by.
 */
describe("the rows of one property divided across parts", () => {
  const built: string[] = []

  afterEach(() => {
    for (const one of built) rmSync(one, { recursive: true, force: true })
    built.length = 0
  })

  function dirHolding(names: readonly string[]): string {
    const at = mkdtempSync(join(tmpdir(), "rows-parts-"))
    built.push(at)
    for (const one of names) writeFileSync(join(at, one), "{}\n")
    return at
  }

  test("a part past the first takes `.partN`, and the first is the bare name", () => {
    const at = "pages/temper-mine/eso.temper-mine.items.jsonl"
    expect(rowsPartOf(at, 1)).toBe(at)
    expect(rowsPartOf(at, 2)).toBe("pages/temper-mine/eso.temper-mine.items.part2.jsonl")
    expect(rowsPartOf(at, 24)).toBe("pages/temper-mine/eso.temper-mine.items.part24.jsonl")
  })

  test("rows kept outside the commit carry the part before `.uncommitted`", () => {
    const at = "pages/seat-log-day/one.seat-log-day.lines.uncommitted.jsonl"
    expect(rowsPartOf(at, 5)).toBe(
      "pages/seat-log-day/one.seat-log-day.lines.part5.uncommitted.jsonl"
    )
  })

  test("the part a file holds is read back off its name, two digits included", () => {
    expect(partNumberOf("pages/temper-mine/eso.temper-mine.items.jsonl")).toBe(1)
    expect(partNumberOf("pages/temper-mine/eso.temper-mine.items.part2.jsonl")).toBe(2)
    expect(partNumberOf("pages/temper-mine/eso.temper-mine.items.part24.jsonl")).toBe(24)
    expect(partNumberOf("pages/seat-log-day/one.seat-log-day.lines.part5.uncommitted.jsonl")).toBe(
      5
    )
  })

  /**
   * The digits are the whole defect. A key matched as `[a-z-]+` reads `items` and stops at
   * `part10`, which is how the catalog came to hold one file of twenty-four and say nothing.
   */
  test("the property a part belongs to is its key, not the part", () => {
    const naming = rowsNamingOf("pages/temper-mine/eso.temper-mine.items.part10.jsonl")
    expect(naming?.key).toBe("items")
    expect(naming?.part).toBe(10)
    expect(naming?.page).toBe("pages/temper-mine/eso.temper-mine")
    expect(rowsNamingOf("pages/temper-mine/eso.temper-mine.items.jsonl")?.part).toBe(1)
    expect(
      rowsNamingOf("pages/seat-log-day/one.seat-log-day.lines.part5.uncommitted.jsonl")?.key
    ).toBe("lines")
  })

  test("every part is found, and answered in part order rather than in name order", () => {
    const at = dirHolding([
      "eso.temper-mine.items.jsonl",
      "eso.temper-mine.items.part2.jsonl",
      "eso.temper-mine.items.part10.jsonl",
      "eso.temper-mine.items.part24.jsonl",
    ])
    expect(
      rowsPartsOf(join(at, "eso.temper-mine.items.jsonl")).map((one) => partNumberOf(one))
    ).toEqual([1, 2, 10, 24])
  })

  test("a part of another property, and another page's parts, are left alone", () => {
    const at = dirHolding([
      "eso.temper-mine.items.jsonl",
      "eso.temper-mine.items.part2.jsonl",
      "eso.temper-mine.quests.part2.jsonl",
      "other.temper-mine.items.part2.jsonl",
    ])
    expect(rowsPartsOf(join(at, "eso.temper-mine.items.jsonl"))).toEqual([
      join(at, "eso.temper-mine.items.jsonl"),
      join(at, "eso.temper-mine.items.part2.jsonl"),
    ])
  })

  test("a divided property whose first file is gone still answers with its parts", () => {
    const at = dirHolding([
      "eso.temper-mine.items.part2.jsonl",
      "eso.temper-mine.items.part3.jsonl",
    ])
    expect(
      rowsPartsOf(join(at, "eso.temper-mine.items.jsonl")).map((one) => partNumberOf(one))
    ).toEqual([2, 3])
  })

  test("the uncommitted half is divided by the same rule and answers separately", () => {
    const at = dirHolding([
      "one.seat-log-day.lines.uncommitted.jsonl",
      "one.seat-log-day.lines.part2.uncommitted.jsonl",
      "one.seat-log-day.lines.jsonl",
    ])
    expect(rowsPartsOf(join(at, "one.seat-log-day.lines.uncommitted.jsonl"))).toEqual([
      join(at, "one.seat-log-day.lines.uncommitted.jsonl"),
      join(at, "one.seat-log-day.lines.part2.uncommitted.jsonl"),
    ])
  })

  test("the mine's own 24 files are what the committed corpus holds", () => {
    const parts = rowsPartsOf(
      `${import.meta.dirname}/../../temper/temper-character/mines/pages/eso/eso.temper-mine.items.jsonl`
    )
    expect(parts.length).toBe(24)
    expect(parts.map((one) => partNumberOf(one))).toEqual(
      Array.from({ length: 24 }, (_, at) => at + 1)
    )
  })
})
