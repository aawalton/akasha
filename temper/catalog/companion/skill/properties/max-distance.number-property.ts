import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const maxDistance = {
  id: "01a06193-6caf-7297-88d0-6892f0580f21",
  type: "page-type/number-property",
  slug: "max-distance",
  propertySlug: "max-distance",
  definition: "a test's furthest range",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
