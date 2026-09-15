import type { BooleanProperty } from "akasha/page/boolean-property/boolean-property.page-type.types.ts"

export const allowed = {
  id: "01a05da1-60fe-725b-a26f-fa08d2276782",
  type: "page-type/boolean-property",
  slug: "allowed",
  propertySlug: "allowed",
  definition: "whether akasha writes in a sentence shape",
  types: "ts",
} as const satisfies BooleanProperty
