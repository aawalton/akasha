import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const trackName = {
  id: "01a06240-340f-7008-a8a3-bad46ed077b9",
  type: "text-property",
  slug: "track-name",
  propertySlug: "track-name",
  definition: "the name Spotify gives a track",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
