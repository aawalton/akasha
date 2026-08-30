import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type Owed = boolean

export const owed = {
  id: "01a05035-2609-7f85-8817-700a5e1a62ea",
  pageTypeSlug: "boolean-property",
  slug: "owed",
  definition: "whether a seat owes its principal an answer",
} as const satisfies BooleanProperty
