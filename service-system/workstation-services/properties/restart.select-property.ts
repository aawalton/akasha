import type { SelectProperty } from "@akasha/pages-system/select-property"

export const restart = {
  id: "01a05a3f-b42e-7f07-a396-69c8d83c02cb",
  pageTypeSlug: "select-property",
  slug: "restart",
  propertySlug: "restart",
  definition: "when a unit is started again after it ends",
  values: ["always", "on-failure"],
} as const satisfies SelectProperty

export type Restart = (typeof restart.values)[number]
