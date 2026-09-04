import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WholeTreeMs = number

export const wholeTreeMs = {
  id: "01a06e1e-6a56-779d-b67a-05bbf4bd3868",
  pageTypeSlug: "number-property",
  slug: "whole-tree-ms",
  propertySlug: "whole-tree-ms",
  definition: "wall milliseconds one run took over every file the index names",
  max: null,
} as const satisfies NumberProperty
