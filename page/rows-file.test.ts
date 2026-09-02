import { describe, expect, test } from "bun:test"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { attachmentFileOf, attachmentPathFor } from "./attachment-file.ts"
import { rowsFileOf } from "./rows-file.ts"

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
    expect(rowsFileOf(AKASHA_DAY, "sessions")).toBe(besideAt(AKASHA_DAY, "sessions", "jsonl"))
    expect(rowsFileOf(AKASHA_DAY, "completed-tasks")).toBe(
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
