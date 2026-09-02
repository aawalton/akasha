import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type AnchoredFromCompletion = boolean

export const anchoredFromCompletion = {
  id: "01a05fd8-c30f-756c-8639-b1792c3f60c7",
  pageTypeSlug: "boolean-property",
  slug: "anchored-from-completion",
  propertySlug: "anchored-from-completion",
  definition: "whether the next round was counted from a finish rather than from its due day",
} as const satisfies BooleanProperty
