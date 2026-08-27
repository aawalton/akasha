import { describe, expect, test } from "bun:test"
import {
  buildRosterViewConfig,
  ROSTER_TITLE_REFRESH_MS,
  ROSTER_VIEW_VISIBLE_PROPERTIES,
} from "./idle-roster-view-config"

describe("roster view config", () => {
  test("builds the gallery config (layout, cover source, page type, visible props)", () => {
    const config = buildRosterViewConfig("card-type-id")
    expect(config.version).toBe(1)
    expect(config.pageTypeId).toBe("card-type-id")
    expect(config.layout).toBe("gallery")
    expect(config.gallery_cover_source).toBe("cover")
    expect(config.visible_properties).toEqual([
      "starsDetail",
      "collected",
      "rank",
      "boostedRatePerSec",
      "train",
      "train10",
      "trainMax",
    ])
    expect(config.visible_properties).not.toContain("stars")
    expect(config.visible_properties).not.toContain("ratePerSec")
    expect(config.visible_properties).not.toContain("rateContribution")
    expect(config.visible_properties).toEqual([...ROSTER_VIEW_VISIBLE_PROPERTIES])
  })

  test("carries the cards' 1s live-refresh cadence, sourced from the canonical constant", () => {
    const config = buildRosterViewConfig("card-type-id")
    expect(config.live_refresh_ms).toBe(1000)
    expect(config.live_refresh_ms).toBe(ROSTER_TITLE_REFRESH_MS)
    expect("title_properties" in config).toBe(false)
    expect("title_properties_align" in config).toBe(false)
  })

  test("defaults the roster page size to 100, overriding the shared engine's 12 (#14726 NIT-1)", () => {
    const config = buildRosterViewConfig("card-type-id")
    expect(config.page_size).toBe(100)
  })

  test("carries NO per-view lock — the lock lives on the DNI nav config (#14039)", () => {
    expect("locked" in buildRosterViewConfig("card-type-id")).toBe(false)
  })
})
