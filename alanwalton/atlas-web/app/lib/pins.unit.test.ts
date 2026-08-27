import { describe, expect, test } from "bun:test"
import { Page } from "@shared/pages-core/page-types"
import { toPins } from "./pins"

function locationRow(attrs: Record<string, unknown>): Page {
  return Page({
    id: "019f0000-0000-7000-8000-000000000001",
    seq: 1,
    title: "A place",
    icon: null,
    userId: "user-1",
    pageTypeId: "pt-location",
    pageTypeSlug: "location",
    createdAt: "2026-06-30T00:00:00Z",
    updatedAt: "2026-06-30T00:00:00Z",
    uniqueKey: null,
    ...attrs,
  })
}

describe("toPins", () => {
  test("maps latitude/longitude attributes to validated pins", () => {
    const pins = toPins([locationRow({ title: "Home", latitude: 47.6062, longitude: -122.3321 })])
    expect(pins).toHaveLength(1)
    expect(pins[0]).toMatchObject({ latitude: 47.6062, longitude: -122.3321, title: "Home" })
  })

  test("drops rows missing either coordinate", () => {
    const rows = [
      locationRow({ latitude: 10, longitude: null }),
      locationRow({ latitude: null, longitude: 20 }),
      locationRow({ title: "no coords" }),
      locationRow({ latitude: 1.5, longitude: 2.5 }),
    ]
    expect(toPins(rows)).toHaveLength(1)
  })

  test("drops out-of-range coordinates rather than rendering a bogus pin", () => {
    const rows = [
      locationRow({ latitude: 91, longitude: 0 }),
      locationRow({ latitude: 0, longitude: 181 }),
      locationRow({ latitude: -90, longitude: 180 }),
    ]
    const pins = toPins(rows)
    expect(pins).toHaveLength(1)
    expect(pins[0]).toMatchObject({ latitude: -90, longitude: 180 })
  })

  test("coerces string-encoded numeric coordinates (charitable input)", () => {
    const pins = toPins([locationRow({ latitude: "40.0", longitude: "-74.0" })])
    expect(pins).toHaveLength(1)
    expect(pins[0]).toMatchObject({ latitude: 40, longitude: -74 })
  })

  test("falls back to a placeholder title and carries an optional address", () => {
    const pins = toPins([
      locationRow({ title: "", address: "1 Main St", latitude: 5, longitude: 6 }),
    ])
    expect(pins[0]).toMatchObject({ title: "Untitled location", address: "1 Main St" })
  })

  test("returns an empty array for no rows", () => {
    expect(toPins([])).toEqual([])
  })
})
