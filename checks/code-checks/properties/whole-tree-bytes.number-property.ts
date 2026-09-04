import type { NumberProperty } from "@akasha/pages-system/number-property"

export type WholeTreeBytes = number

export const wholeTreeBytes = {
  id: "01a06e1e-6a57-7e13-b6b4-413d79d07bd0",
  pageTypeSlug: "number-property",
  slug: "whole-tree-bytes",
  propertySlug: "whole-tree-bytes",
  definition: "bytes one run added over every file the index names",
  max: null,
} as const satisfies NumberProperty
