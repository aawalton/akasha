import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const adasStandard = {
  id: "01a0c543-6711-7055-8a6c-1b604a6213ed",
  type: "page-type/text-property",
  slug: "adas-standard",
  propertySlug: "adas-standard",
  definition: "what driver assistance a trim carries at no extra cost",
  maxLength: 1000,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
