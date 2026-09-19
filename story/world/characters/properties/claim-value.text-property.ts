import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const claimValue = {
  id: "01a0b6f7-17f2-77ac-beba-de9db14f3691",
  type: "page-type/text-property",
  slug: "claim-value",
  propertySlug: "claim-value",
  definition: "what a claim says, in the story's own wording",
  maxLength: 500,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
