import type { ViewDataJSON } from "akasha/pages/core/schema/view-data/view-data.module.code.ts"

export const IDLE_REORDER_VERB_ID = "idle-lineup-reorder"

const LINEUP_SEAT_INDEX_PROPERTY_ID = "seatIndex"

const LINEUP_VIEW_VISIBLE_PROPERTIES = [
  "starsDetail",
  "collected",
  "rank",
  "boostedRatePerSec",
  "train",
  "train10",
  "trainMax",
  "remove",
] as const

export function buildLineupViewConfig(cardPageTypeId: string) {
  return {
    version: 1,
    pageTypeId: cardPageTypeId,
    layout: "gallery",
    gallery_cover_source: "cover",
    gallery_card_size: "small",
    visible_properties: [...LINEUP_VIEW_VISIBLE_PROPERTIES],
    filters: [{ propertyId: LINEUP_SEAT_INDEX_PROPERTY_ID, operator: "is_not_empty" }],
    sorts: [{ field: LINEUP_SEAT_INDEX_PROPERTY_ID, direction: "asc" }],
    reorder: { verbId: IDLE_REORDER_VERB_ID },
  } as const satisfies ViewDataJSON
}
