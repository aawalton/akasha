import { describe, expect, test } from "bun:test"
import { besideAt } from "@akasha/pages-system/page-file-name"
import { rowsFileOf } from "./rows-file.ts"
import { attachmentFileOf } from "./attachment-file.ts"

const MARKDOWN_DAY = "pages/daily-tracking/2026-03-05.daily-tracking.md"

const AKASHA_DAY = "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05.daily-tracking.ts"

describe("what stands beside a page", () => {
  test("a markdown page's rows drop `.md`", () => {
    expect(rowsFileOf(MARKDOWN_DAY, "sessions")).toBe(
      "pages/daily-tracking/2026-03-05.daily-tracking.sessions.jsonl"
    )
  })

  test("an akasha page's rows drop `.ts`, and never carry it into the name", () => {
    const at = rowsFileOf(AKASHA_DAY, "sessions")
    expect(at).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05.daily-tracking.sessions.jsonl"
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
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05.daily-tracking.sessions.uncommitted.jsonl"
    )
  })

  test("an attachment drops the page's own extension in both halves", () => {
    expect(attachmentFileOf(MARKDOWN_DAY, "notes", "md")).toBe(
      "pages/daily-tracking/2026-03-05.daily-tracking.notes.attachment.md"
    )
    expect(attachmentFileOf(AKASHA_DAY, "notes", "md")).toBe(
      "akasha/alan/daily-tracking/daily-trackings/day-2026-03-05.daily-tracking.notes.attachment.md"
    )
  })
})
