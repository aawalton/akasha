import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type Bindings = "xml"

export const bindings = {
  id: "01a06036-9b78-70bc-b9c0-1204d0737652",
  pageTypeSlug: "named-file-property",
  slug: "bindings",
  propertySlug: "bindings",
  definition: "the keys an addon binds",
  fileName: "Bindings.xml",
} as const satisfies NamedFileProperty
