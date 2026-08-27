import { describe, expect, test } from "bun:test"
import type { ListingConfig } from "@shared/pages-core/schema/listing-config"
import type { ViewDataJSON } from "@shared/pages-core/schema/view-data"
import { resolveListingViewData } from "./resolve-listing-config"

const emptyUrlConfig: ViewDataJSON = { version: 1 }

describe("resolveListingViewData", () => {
  test("returns the synthetic config unchanged when no listingConfig", () => {
    const url: ViewDataJSON = { version: 1, sorts: [{ field: "title", direction: "asc" }] }
    expect(resolveListingViewData(undefined, url)).toBe(url)
  })

  test("supplies the per-type default for keys the URL leaves unset", () => {
    const listing: ListingConfig = {
      layout: "gallery",
      gallery_cover_source: "cover",
      gallery_card_size: "medium",
      sorts: [{ field: "seq", direction: "desc" }],
      visible_properties: ["author", "seriesName"],
    }
    const resolved = resolveListingViewData(listing, emptyUrlConfig)
    expect(resolved.layout).toBe("gallery")
    expect(resolved.gallery_cover_source).toBe("cover")
    expect(resolved.gallery_card_size).toBe("medium")
    expect(resolved.sorts).toEqual([{ field: "seq", direction: "desc" }])
    expect(resolved.visible_properties).toEqual(["author", "seriesName"])
  })

  test("URL sort overrides the curated default sort", () => {
    const listing: ListingConfig = {
      layout: "gallery",
      sorts: [{ field: "seq", direction: "desc" }],
    }
    const url: ViewDataJSON = { version: 1, sorts: [{ field: "title", direction: "asc" }] }
    const resolved = resolveListingViewData(listing, url)
    expect(resolved.sorts).toEqual([{ field: "title", direction: "asc" }])
    expect(resolved.layout).toBe("gallery")
  })

  test("URL filters win when present; default filters apply otherwise", () => {
    const listing: ListingConfig = {
      filters: [{ propertyId: "status", operator: "equals", value: "published" }],
    }
    const url: ViewDataJSON = {
      version: 1,
      filters: [{ propertyId: "author", operator: "equals", value: "x" }],
    }
    expect(resolveListingViewData(listing, url).filters).toEqual([
      { propertyId: "author", operator: "equals", value: "x" },
    ])
    expect(resolveListingViewData(listing, emptyUrlConfig).filters).toEqual([
      { propertyId: "status", operator: "equals", value: "published" },
    ])
  })
})
