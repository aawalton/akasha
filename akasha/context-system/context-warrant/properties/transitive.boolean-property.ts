import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type Transitive = boolean

export const transitive = {
  id: "01a04f56-55c4-7003-993e-55f264749333",
  pageTypeSlug: "boolean-property",
  slug: "transitive",
  definition: "whether what this warrant names is asked what it warrants in turn",
} as const satisfies BooleanProperty
