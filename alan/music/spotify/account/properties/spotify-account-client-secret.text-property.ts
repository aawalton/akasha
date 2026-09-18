import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountClientSecret = {
  id: "01a0b6db-6f43-7342-9953-03f21f90bbb1",
  type: "page-type/text-property",
  slug: "spotify-account-client-secret",
  propertySlug: "client-secret",
  definition: "what authorises a call as the application",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
