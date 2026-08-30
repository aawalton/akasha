import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type OpenQuestion = boolean

export const openQuestion = {
  id: "01a05035-2609-7a22-b4fc-2a3b06593817",
  pageTypeSlug: "boolean-property",
  slug: "open-question",
  definition: "whether a seat has asked something it has not been answered",
} as const satisfies BooleanProperty
