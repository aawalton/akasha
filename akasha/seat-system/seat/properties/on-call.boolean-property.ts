import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type OnCall = boolean

export const onCall = {
  id: "01a05035-2609-7045-bc82-224e8a98f6ba",
  pageTypeSlug: "boolean-property",
  slug: "on-call",
  definition: "whether a seat stands ready for work sent to it",
} as const satisfies BooleanProperty
