import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const affinityType = {
  id: "01a0c638-9f00-74d0-a0c4-e701d4f61af2",
  type: "page-type/text-property",
  slug: "affinity-type",
  propertySlug: "type",
  definition: "what an affinity is an affinity for",
  maxLength: 100,
  nameFormat: null,
  types: "ts",
} as const satisfies TextProperty
