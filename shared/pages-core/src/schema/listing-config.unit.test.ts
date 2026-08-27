import { describe, expect, test } from "bun:test"
import {
  type ListingConfig,
  listingConfigToViewData,
  listingIncludesDescendants,
  parseListingConfig,
} from "./listing-config"

describe("parseListingConfig", () => {
  test("returns undefined for absent input", () => {
    expect(parseListingConfig(undefined)).toBeUndefined()
    expect(parseListingConfig(null)).toBeUndefined()
  })

  test("parses a coverAction list-surface interaction", () => {
    const cfg = parseListingConfig({ coverAction: { capability: "roster-gallery" } })
    expect(cfg?.coverAction?.capability).toBe("roster-gallery")
  })

  test("rejects a coverAction missing its capability slug", () => {
    expect(parseListingConfig({ coverAction: { capability: 42 } })).toBeUndefined()
  })

  test("parses a full gallery default", () => {
    const cfg = parseListingConfig({
      layout: "gallery",
      gallery_cover_source: "cover",
      gallery_card_size: "medium",
      sorts: [{ field: "seq", direction: "desc" }],
      visible_properties: ["author", "seriesName"],
      includeDescendants: true,
    })
    expect(cfg?.layout).toBe("gallery")
    expect(cfg?.gallery_cover_source).toBe("cover")
    expect(cfg?.sorts).toEqual([{ field: "seq", direction: "desc" }])
    expect(cfg?.visible_properties).toEqual(["author", "seriesName"])
  })

  test("preserves unknown keys (built for expansion)", () => {
    const cfg = parseListingConfig({ layout: "gallery", futureField: 42 })
    expect(Reflect.get(cfg ?? {}, "futureField")).toBe(42)
  })

  test("returns undefined on a hard type failure (degrades to no default)", () => {
    expect(parseListingConfig({ layout: "not-a-layout" })).toBeUndefined()
    expect(parseListingConfig({ sorts: "nope" })).toBeUndefined()
  })

  test("empty object parses to an empty config", () => {
    expect(parseListingConfig({})).toEqual({})
  })
})

describe("listingIncludesDescendants", () => {
  test("default-polymorphic: absent ⇒ true", () => {
    expect(listingIncludesDescendants(undefined)).toBe(true)
    expect(listingIncludesDescendants({})).toBe(true)
    expect(listingIncludesDescendants({ includeDescendants: true })).toBe(true)
  })

  test("explicit false opts out", () => {
    expect(listingIncludesDescendants({ includeDescendants: false })).toBe(false)
  })
})

describe("listingConfigToViewData", () => {
  test("projects the listing-default subset onto ViewDataJSON, dropping includeDescendants", () => {
    const cfg: ListingConfig = {
      layout: "gallery",
      gallery_cover_source: "cover",
      gallery_card_size: "large",
      sorts: [{ field: "seq", direction: "desc" }],
      visible_properties: ["author"],
      includeDescendants: false,
    }
    const vd = listingConfigToViewData(cfg)
    expect(vd.version).toBe(1)
    expect(vd.layout).toBe("gallery")
    expect(vd.gallery_cover_source).toBe("cover")
    expect(vd.gallery_card_size).toBe("large")
    expect(vd.sorts).toEqual([{ field: "seq", direction: "desc" }])
    expect(vd.visible_properties).toEqual(["author"])
    expect("includeDescendants" in vd).toBe(false)
  })
})
