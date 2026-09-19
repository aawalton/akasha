import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const warmupLoadShare = {
  id: "01a0b739-cbb2-769c-a934-9ec872efa0ea",
  type: "page-type/number-property",
  slug: "warmup-load-share",
  propertySlug: "warmup-load-share",
  definition: "the share of a working set's weight a warmup set takes",
  max: null,
  types: "ts",
} as const satisfies NumberProperty
