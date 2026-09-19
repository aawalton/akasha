import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const boutsWithoutProgress = {
  id: "01a0b716-c506-7fc0-8c47-598b8f2ffcc4",
  type: "page-type/number-property",
  slug: "bouts-without-progress",
  propertySlug: "bouts-without-progress",
  definition: "how many bouts a movement goes without progressing before it is dropped",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
