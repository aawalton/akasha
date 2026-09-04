import type { TextProperty } from "@akasha/pages-system/text-property"

export type TrackName = string

export const trackName = {
  id: "01a06240-340f-7008-a8a3-bad46ed077b9",
  pageTypeSlug: "text-property",
  slug: "track-name",
  propertySlug: "track-name",
  definition: "the name Spotify gives a track",
  max: 200,
  nameFormatSlug: null,
} as const satisfies TextProperty
