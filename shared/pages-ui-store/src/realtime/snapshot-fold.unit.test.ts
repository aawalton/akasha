import { describe, expect, test } from "bun:test"
import type { PageRow } from "./payload-translator"
import { foldSnapshotEntries, type SnapshotEntry } from "./snapshot-fold"

const ID_A = "0190f3a0-1234-7abc-9def-000000000001"
const ID_B = "0190f3a0-1234-7abc-9def-000000000002"

function row(id: string, title: string): PageRow {
  return {
    id,
    page_type_id: "0190f3a0-1234-7abc-9def-aaaaaaaaaaaa",
    user_id: "019e132a-1234-7890-abcd-ef0123456791",
    seq: 1,
    title,
    icon: null,
    slug: null,
    parent_key: null,
    created_at: "2026-05-24T00:00:00.000Z",
    updated_at: "2026-05-24T00:00:00.000Z",
    attributes: {},
    page_type_slug: "view",
    unique_key: null,
    status: null,
    completed_at: null,
  }
}

function upsert(id: string, title: string): SnapshotEntry {
  return { kind: "upsert", row: row(id, title) }
}

function del(id: string): SnapshotEntry {
  return { kind: "delete", id }
}

describe("foldSnapshotEntries — last state per row wins (#14184)", () => {
  test("multiple historical versions of one row fold to the final version only", () => {
    const out = foldSnapshotEntries([
      upsert(ID_A, "v1-stale-with-art"),
      upsert(ID_A, "v2-middle"),
      upsert(ID_A, "v3-final"),
    ])
    expect(out.upserts.map((r) => r.title)).toEqual(["v3-final"])
    expect(out.deletes).toEqual([])
  })

  test("upsert followed by delete folds to the delete alone", () => {
    const out = foldSnapshotEntries([upsert(ID_A, "v1"), del(ID_A)])
    expect(out.upserts).toEqual([])
    expect(out.deletes).toEqual([ID_A])
  })

  test("delete followed by re-insert folds to the upsert alone", () => {
    const out = foldSnapshotEntries([del(ID_A), upsert(ID_A, "reborn")])
    expect(out.upserts.map((r) => r.title)).toEqual(["reborn"])
    expect(out.deletes).toEqual([])
  })

  test("distinct rows keep first-seen order", () => {
    const out = foldSnapshotEntries([upsert(ID_A, "a1"), upsert(ID_B, "b1"), upsert(ID_A, "a2")])
    expect(out.upserts.map((r) => [r.id, r.title])).toEqual([
      [ID_A, "a2"],
      [ID_B, "b1"],
    ])
  })

  test("empty input folds to empty output", () => {
    expect(foldSnapshotEntries([])).toEqual({ upserts: [], deletes: [] })
  })
})
