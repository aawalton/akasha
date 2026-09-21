import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const knownIssues = {
  id: "01a0c543-e037-74bc-a866-e97d3784b4be",
  type: "page-type/text-property",
  slug: "known-issues",
  propertySlug: "known-issues",
  definition: "what owners and testers report going wrong with a trim",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
