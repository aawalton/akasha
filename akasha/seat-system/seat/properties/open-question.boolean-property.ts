import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type OpenQuestion = boolean

export const openQuestion = {
  id: "01a0541c-db61-7c78-abaf-6b8052e5532b",
  pageTypeSlug: "boolean-property",
  slug: "open-question",
  propertySlug: "open-question",
  definition: "whether a seat has asked something it has not been answered",
} as const satisfies BooleanProperty
