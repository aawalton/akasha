import type { SelectProperty } from "@akasha/pages-system/select-property"

export const mechanic = {
  id: "01a0657b-1ad2-7865-9244-68634645f334",
  pageTypeSlug: "select-property",
  slug: "mechanic",
  propertySlug: "mechanic",
  definition: "whether the movement crosses one joint or several",
  values: ["compound", "isolation"],
} as const satisfies SelectProperty

export type Mechanic = (typeof mechanic.values)[number]
