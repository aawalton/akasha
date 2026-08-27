import { describe, expect, test } from "bun:test"
import {
  buildLineupViewConfig,
  IDLE_REORDER_VERB_ID,
  LINEUP_SEAT_INDEX_PROPERTY_ID,
  LINEUP_VIEW_VISIBLE_PROPERTIES,
} from "./idle-lineup-view-config"

describe("lineup view config", () => {
  test("builds the gallery config (layout, cover source, card size, page type)", () => {
    const config = buildLineupViewConfig("card-type-id")
    expect(config.version).toBe(1)
    expect(config.pageTypeId).toBe("card-type-id")
    expect(config.layout).toBe("gallery")
    expect(config.gallery_cover_source).toBe("cover")
    expect(config.gallery_card_size).toBe("small")
  })

  test("visible props mirror the roster order then append the two lineup controls", () => {
    const config = buildLineupViewConfig("card-type-id")
    expect(config.visible_properties).toEqual([
      "starsDetail",
      "collected",
      "rank",
      "boostedRatePerSec",
      "train",
      "train10",
      "trainMax",
      "remove",
    ])
    expect(config.visible_properties).not.toContain("stars")
    expect(config.visible_properties).not.toContain("ratePerSec")
    expect(config.visible_properties).not.toContain("rateContribution")
    expect(config.visible_properties).toEqual([...LINEUP_VIEW_VISIBLE_PROPERTIES])
  })

  test("filters ON-TEAM: seatIndex is_not_empty (present ⇔ seated)", () => {
    const { filters } = buildLineupViewConfig("card-type-id")
    expect(filters).toEqual([
      { propertyId: LINEUP_SEAT_INDEX_PROPERTY_ID, operator: "is_not_empty" },
    ])
  })

  test("sorts by seatIndex ASC so the visible card order IS the activeTeam order", () => {
    const { sorts } = buildLineupViewConfig("card-type-id")
    expect(sorts).toEqual([{ field: LINEUP_SEAT_INDEX_PROPERTY_ID, direction: "asc" }])
  })

  test("the on-team filter and seat sort share ONE property id (never diverge)", () => {
    const config = buildLineupViewConfig("card-type-id")
    expect(config.filters?.[0]?.propertyId).toBe(config.sorts?.[0]?.field)
    expect(LINEUP_SEAT_INDEX_PROPERTY_ID).toBe("seatIndex")
  })

  test("names the lineup reorder verb in its `reorder` facet (#14284 channel)", () => {
    expect(buildLineupViewConfig("card-type-id").reorder).toEqual({ verbId: IDLE_REORDER_VERB_ID })
    expect(IDLE_REORDER_VERB_ID).toBe("idle-lineup-reorder")
  })

  test("carries NO per-view lock — the lock lives on the DNI nav config (#14039)", () => {
    expect("locked" in buildLineupViewConfig("card-type-id")).toBe(false)
  })
})
