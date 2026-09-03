import type { SelectProperty } from "@akasha/pages-system/select-property"

export const skillCost = {
  id: "01a0657e-2bc0-70b8-9883-2ec311b92460",
  pageTypeSlug: "select-property",
  slug: "skill-cost",
  propertySlug: "skill-cost",
  definition: "how much attention the movement takes to perform safely",
  values: ["high", "low", "moderate"],
} as const satisfies SelectProperty

export type SkillCost = (typeof skillCost.values)[number]
