import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountClientId = {
  id: "01a0b6db-5286-74ce-b7b1-1cd0738f7419",
  type: "page-type/text-property",
  slug: "spotify-account-client-id",
  propertySlug: "client-id",
  definition: "the id Spotify gives the client that calls Spotify",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-18T23:30:21.958Z",
  updatedAt: "2026-10-30T16:30:40.255Z",
} as const satisfies TextProperty
