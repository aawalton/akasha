import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const spotifyAccountRedirectUri = {
  id: "01a0b6db-8c44-7062-bd05-3db16b78168b",
  type: "page-type/text-property",
  slug: "spotify-account-redirect-uri",
  propertySlug: "redirect-uri",
  definition: "where consent is handed back to after a sign-in",
  maxLength: 200,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
