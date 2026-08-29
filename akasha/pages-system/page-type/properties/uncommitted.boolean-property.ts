import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type Uncommitted = boolean

export const uncommitted = {
  id: "01a04fc4-b988-7afd-89a2-9c87b0274410",
  pageTypeSlug: "boolean-property",
  slug: "uncommitted",
  definition: "whether the value a page carries for this property stands outside the commit",
} as const satisfies BooleanProperty
