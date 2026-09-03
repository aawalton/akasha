import type { SelectProperty } from "@akasha/pages-system/select-property"

export const resolution = {
  id: "01a0673c-8e0e-7009-834e-edf6c52bf5fb",
  pageTypeSlug: "select-property",
  slug: "resolution",
  propertySlug: "resolution",
  definition: "how a game settles what an action comes to",
  values: ["none", "formula", "hybrid"],
} as const satisfies SelectProperty

export type Resolution = (typeof resolution.values)[number]
