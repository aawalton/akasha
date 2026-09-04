import type { SelectProperty } from "@akasha/pages-system/select-property"

export const force = {
  id: "01a0657e-2bbf-7e84-8d89-c9451bbec33a",
  pageTypeSlug: "select-property",
  slug: "force",
  propertySlug: "force",
  definition: "which way the movement drives the load",
  values: ["pull", "push", "static"],
} as const satisfies SelectProperty

export type Force = (typeof force.values)[number]
