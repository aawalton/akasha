import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type Allowed = boolean

export const allowed = {
  id: "01a05da1-60fe-725b-a26f-fa08d2276782",
  pageTypeSlug: "boolean-property",
  slug: "allowed",
  propertySlug: "allowed",
  definition: "whether akasha writes in a sentence shape",
} as const satisfies BooleanProperty
