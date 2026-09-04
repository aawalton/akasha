import type { SelectProperty } from "@akasha/pages-system/select-property"

export const mechanicsWeight = {
  id: "01a0673c-8e0e-7008-975c-8cd78b5fcf4f",
  pageTypeSlug: "select-property",
  slug: "mechanics-weight",
  propertySlug: "mechanics-weight",
  definition: "how much of a game is decided by its numbers",
  values: ["zero", "medium", "heavy"],
} as const satisfies SelectProperty

export type MechanicsWeight = (typeof mechanicsWeight.values)[number]
