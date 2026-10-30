import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountRedirectUri = {
  id: "01a0b6db-8c44-7062-bd05-3db16b78168b",
  type: "page-type/text-property",
  slug: "spotify-account-redirect-uri",
  propertySlug: "redirect-uri",
  definition: "the link Spotify sends a person to when the person gives consent",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-18T23:30:36.740Z",
  updatedAt: "2026-10-30T16:31:08.292Z",
} as const satisfies TextProperty
