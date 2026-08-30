import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type LiveChild = boolean

export const liveChild = {
  id: "01a05035-2609-7c68-b06c-2ced5ad766e4",
  pageTypeSlug: "boolean-property",
  slug: "live-child",
  definition: "whether something a seat started is still working",
} as const satisfies BooleanProperty
