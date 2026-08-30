import type { BooleanProperty } from "../../boolean-property/boolean-property.page-type.ts"

export type Secret = boolean

export const secret = {
  id: "01a0547c-6ae7-7000-897a-83b3e0d40bc4",
  pageTypeSlug: "boolean-property",
  slug: "secret",
  propertySlug: "secret",
  definition:
    "whether the value a page carries for this property is hidden from whoever holds the files",
} as const satisfies BooleanProperty
