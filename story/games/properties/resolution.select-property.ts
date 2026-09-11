import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const resolution = {
  id: "01a0673c-8e0e-7009-834e-edf6c52bf5fb",
  type: "select-property",
  slug: "resolution",
  propertySlug: "resolution",
  definition: "how a game settles what an action comes to",
  values: ["none", "formula", "hybrid"],
  types: "ts",
} as const satisfies SelectProperty
