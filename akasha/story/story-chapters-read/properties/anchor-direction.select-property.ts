import type { SelectProperty } from "@akasha/pages-system/select-property"

export const anchorDirection = {
  id: "01a0685e-ef8a-7e52-9e45-460c839b0933",
  pageTypeSlug: "select-property",
  slug: "anchor-direction",
  propertySlug: "direction",
  definition: "which way an anchor runs from what it is read against",
  values: ["before", "after", "simultaneous"],
} as const satisfies SelectProperty

export type AnchorDirection = (typeof anchorDirection.values)[number]
