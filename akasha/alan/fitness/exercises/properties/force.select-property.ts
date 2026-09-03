import type { SelectProperty } from "@akasha/pages-system/select-property"

export const force = {
  id: "01a0657b-1ad2-7cf8-a25e-a0fcc84ade65",
  pageTypeSlug: "select-property",
  slug: "force",
  propertySlug: "force",
  definition: "which way the movement drives the load",
  values: ["pull", "push", "static"],
} as const satisfies SelectProperty

export type Force = (typeof force.values)[number]
