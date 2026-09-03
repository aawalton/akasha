import type { SelectProperty } from "@akasha/pages-system/select-property"

export const mechanic = {
  id: "01a0657e-2bbf-7358-a603-36a24d364e4e",
  pageTypeSlug: "select-property",
  slug: "mechanic",
  propertySlug: "mechanic",
  definition: "whether the movement crosses one joint or several",
  values: ["compound", "isolation"],
} as const satisfies SelectProperty

export type Mechanic = (typeof mechanic.values)[number]
