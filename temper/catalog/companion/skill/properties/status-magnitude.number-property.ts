import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const statusMagnitude = {
  id: "01a06193-6cad-7c36-85ea-f127d8db3b2a",
  type: "page-type/number-property",
  slug: "status-magnitude",
  propertySlug: "magnitude",
  definition: "how strongly a status holds",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
