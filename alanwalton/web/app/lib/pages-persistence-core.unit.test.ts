import { describe, expect, test } from "bun:test"
import type { PageRow } from "@shared/pages-ui-store/collection/page-row"
import {
  EMPTY_PAGES_SNAPSHOT,
  parsePagesSnapshot,
  serializePagesSnapshot,
} from "./pages-persistence-core"

function mkRow(id: string): PageRow {
  return {
    id,
    page_type_id: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    user_id: "user-1",
    seq: 1,
    title: "page",
    icon: null,
    created_at: "2026-05-24T00:00:00.000Z",
    updated_at: "2026-05-24T00:00:00.000Z",
    attributes: { label: "x" },
    page_type_slug: "story-chapter",
    unique_key: null,
    status: null,
    completed_at: null,
    slug: null,
    parent_key: null,
    favorited_at: null,
    last_viewed_at: null,
  }
}

describe("parsePagesSnapshot", () => {
  test("round-trips a valid snapshot (rows + resume preserved)", () => {
    const snapshot = {
      version: 1 as const,
      rows: [mkRow("0190f3a0-1234-7abc-9def-000000000001")],
      resume: [["slug:story-chapter", { offset: "12_0", handle: "h-9" }]] as const,
    }
    const parsed = parsePagesSnapshot(serializePagesSnapshot(snapshot))
    expect(parsed).not.toBeNull()
    expect(parsed?.version).toBe(1)
    expect(parsed?.rows.length).toBe(1)
    expect(parsed?.rows[0]?.id).toBe("0190f3a0-1234-7abc-9def-000000000001")
    expect(parsed?.resume).toEqual([["slug:story-chapter", { offset: "12_0", handle: "h-9" }]])
  })

  test("the empty snapshot round-trips", () => {
    const parsed = parsePagesSnapshot(serializePagesSnapshot(EMPTY_PAGES_SNAPSHOT))
    expect(parsed).toEqual(EMPTY_PAGES_SNAPSHOT)
  })

  test("malformed JSON → null", () => {
    expect(parsePagesSnapshot("{not json")).toBeNull()
    expect(parsePagesSnapshot("")).toBeNull()
  })

  test("wrong schema version → null (stale build)", () => {
    expect(parsePagesSnapshot(JSON.stringify({ version: 2, rows: [], resume: [] }))).toBeNull()
  })

  test("missing / extra top-level keys → null (strict)", () => {
    expect(parsePagesSnapshot(JSON.stringify({ version: 1, rows: [] }))).toBeNull()
    expect(
      parsePagesSnapshot(JSON.stringify({ version: 1, rows: [], resume: [], extra: true }))
    ).toBeNull()
  })

  test("a row missing a required column → null (never a partial load)", () => {
    const badRow = { id: "0190f3a0-1234-7abc-9def-000000000001" }
    expect(
      parsePagesSnapshot(JSON.stringify({ version: 1, rows: [badRow], resume: [] }))
    ).toBeNull()
  })

  test("a resume entry with the wrong shape → null", () => {
    expect(
      parsePagesSnapshot(
        JSON.stringify({ version: 1, rows: [], resume: [["k", { offset: "1_0" }]] })
      )
    ).toBeNull()
  })
})
