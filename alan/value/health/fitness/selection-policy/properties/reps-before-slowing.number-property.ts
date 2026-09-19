import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const repsBeforeSlowing = {
  id: "01a0b725-409c-789a-aedb-7dc9a4769501",
  type: "page-type/number-property",
  slug: "reps-before-slowing",
  propertySlug: "reps-before-slowing",
  definition: "how many reps a movement reaches before slowing the rep is what makes it harder",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
