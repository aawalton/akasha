import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const delay = {
  id: "01a06193-6ca8-7884-956b-237d461f1c14",
  type: "page-type/number-property",
  slug: "delay",
  propertySlug: "delay",
  definition: "how many seconds pass before a delayed effect fires",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
