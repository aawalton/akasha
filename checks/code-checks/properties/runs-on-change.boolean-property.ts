import type { BooleanProperty } from "akasha/pages/boolean-properties/boolean-property.page-type.types.ts"

export const runsOnChange = {
  id: "01a04e26-4526-722e-b610-57b7d1747f40",
  type: "boolean-property",
  slug: "runs-on-change",
  propertySlug: "runs-on-change",
  definition: "whether a check judges a set of changes at change",
  types: "ts",
} as const satisfies BooleanProperty
