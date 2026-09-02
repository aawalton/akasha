import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type RruleAnchorFromCompletion = boolean

export const rruleAnchorFromCompletion = {
  id: "01a05fc6-81fd-71d5-b309-ea22023c9f8d",
  pageTypeSlug: "boolean-property",
  slug: "rrule-anchor-from-completion",
  propertySlug: "rrule-anchor-from-completion",
  definition: "whether the next occurrence counts from when the task was last done",
} as const satisfies BooleanProperty
