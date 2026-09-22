import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const hitCount = {
  id: "01a06193-6caa-7ead-88b8-3e7783f4b8f6",
  type: "page-type/number-property",
  slug: "hit-count",
  propertySlug: "hit-count",
  definition: "how many hits a cast lands",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
