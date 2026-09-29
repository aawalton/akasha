import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const overwhereIvSkillReachPaces = {
  id: "01a0ed1b-1aed-7c04-af16-9e415a53d42e",
  type: "page-type/number-property",
  slug: "overwhere-iv-skill-reach-paces",
  propertySlug: "reach-paces",
  definition: "how far from its holder a skill held in Overwhere IV works, in paces",
  nullable: false,
  max: 100000,
  types: "ts",
} as const satisfies NumberProperty
