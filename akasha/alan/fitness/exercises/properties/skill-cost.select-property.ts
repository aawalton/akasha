import type { SelectProperty } from "@akasha/pages-system/select-property"

export const skillCost = {
  id: "01a0657b-1ad2-7c4b-8883-f9e0e0c32a48",
  pageTypeSlug: "select-property",
  slug: "skill-cost",
  propertySlug: "skill-cost",
  definition: "how much attention the movement takes to perform safely",
  values: ["high", "low", "moderate"],
} as const satisfies SelectProperty

export type SkillCost = (typeof skillCost.values)[number]
