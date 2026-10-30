import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountClientSecret = {
  id: "01a0b6db-6f43-7342-9953-03f21f90bbb1",
  type: "page-type/text-property",
  slug: "spotify-account-client-secret",
  propertySlug: "client-secret",
  definition: "the password Spotify gives the client that calls Spotify",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
  createdAt: "2026-09-18T23:30:29.315Z",
  updatedAt: "2026-10-30T16:30:52.363Z",
} as const satisfies TextProperty
