import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const featureRequestAsk = {
  id: "01a0c4a6-684f-7c1f-8a04-2839b74d5cae",
  type: "page-type/text-property",
  slug: "feature-request-ask",
  propertySlug: "ask",
  definition: "what a contributor wants Alan to build",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
