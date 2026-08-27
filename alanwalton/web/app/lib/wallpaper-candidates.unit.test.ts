import { describe, expect, test } from "bun:test"
import { orderedCoverCandidates, type PersonaCoverRow } from "./wallpaper-candidates"

function row(id: string, lastMessagedAt: string | null, cover: string | null): PersonaCoverRow {
  return { id, lastMessagedAt, cover }
}

describe("orderedCoverCandidates", () => {
  test("orders by lastMessagedAt descending, mapping cover -> cover page-id", () => {
    const rows = [
      row("p-old", "2026-07-10T00:00:00.000Z", "/api/image/cov-old"),
      row("p-new", "2026-07-14T00:00:00.000Z", "/api/image/cov-new"),
      row("p-mid", "2026-07-12T00:00:00.000Z", "/api/image/cov-mid"),
    ]
    expect(orderedCoverCandidates(rows)).toEqual(["cov-new", "cov-mid", "cov-old"])
  })

  test("drops personas with no parseable cover (unset or non-cover string)", () => {
    const rows = [
      row("p-new", "2026-07-14T00:00:00.000Z", null),
      row("p-mid", "2026-07-12T00:00:00.000Z", ""),
      row("p-legacy", "2026-07-13T00:00:00.000Z", "https://example.com/x.png"),
      row("p-ok", "2026-07-11T00:00:00.000Z", "/api/image/cov-ok"),
    ]
    expect(orderedCoverCandidates(rows)).toEqual(["cov-ok"])
  })

  test("a never-addressed persona (no stamp) still fronts a cover, but sorts last", () => {
    const rows = [
      row("p-never", null, "/api/image/cov-never"),
      row("p-recent", "2026-07-14T00:00:00.000Z", "/api/image/cov-recent"),
    ]
    expect(orderedCoverCandidates(rows)).toEqual(["cov-recent", "cov-never"])
  })

  test("breaks stamp ties by persona id ascending for a deterministic order", () => {
    const rows = [
      row("p-b", "2026-07-14T00:00:00.000Z", "/api/image/cov-b"),
      row("p-a", "2026-07-14T00:00:00.000Z", "/api/image/cov-a"),
    ]
    expect(orderedCoverCandidates(rows)).toEqual(["cov-a", "cov-b"])
  })

  test("an unparseable stamp is treated as oldest, not as most-recent", () => {
    const rows = [
      row("p-bad", "not-a-date", "/api/image/cov-bad"),
      row("p-good", "2026-07-01T00:00:00.000Z", "/api/image/cov-good"),
    ]
    expect(orderedCoverCandidates(rows)).toEqual(["cov-good", "cov-bad"])
  })

  test("no personas with covers yields an empty candidate list", () => {
    expect(orderedCoverCandidates([])).toEqual([])
    expect(orderedCoverCandidates([row("p", "2026-07-14T00:00:00.000Z", null)])).toEqual([])
  })
})
