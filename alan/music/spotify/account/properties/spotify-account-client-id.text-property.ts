import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountClientId = {
  id: "01a0b6db-5286-74ce-b7b1-1cd0738f7419",
  type: "page-type/text-property",
  slug: "spotify-account-client-id",
  propertySlug: "client-id",
  definition: "what names the application a call is made by",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
