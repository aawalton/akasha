export const ROSTER_VIEW_VISIBLE_PROPERTIES = [
  "starsDetail",
  "collected",
  "rank",
  "boostedRatePerSec",
  "train",
  "train10",
  "trainMax",
] as const

export type RosterViewConfig = {
  readonly version: number
  readonly pageTypeId: string
  readonly layout: string
  readonly gallery_cover_source: string
  readonly gallery_card_size: "small" | "medium" | "large"
  readonly group_by: string
  readonly visible_properties: readonly string[]
  readonly page_size: number
}

export function buildRosterViewConfig(cardPageTypeId: string): RosterViewConfig {
  return {
    version: 1,
    pageTypeId: cardPageTypeId,
    layout: "gallery",
    gallery_cover_source: "cover",
    gallery_card_size: "small",
    group_by: "lockState",
    visible_properties: [...ROSTER_VIEW_VISIBLE_PROPERTIES],
    page_size: 100,
  }
}
