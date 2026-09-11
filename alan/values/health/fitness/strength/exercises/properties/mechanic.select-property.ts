import type { SelectProperty } from "akasha/pages/select-properties/select-property.page-type.types.ts"

export const mechanic = {
  id: "01a0657e-2bbf-7358-a603-36a24d364e4e",
  type: "select-property",
  slug: "mechanic",
  propertySlug: "mechanic",
  definition: "whether the movement crosses one joint or several",
  values: ["compound", "isolation"],
  types: "ts",
} as const satisfies SelectProperty
