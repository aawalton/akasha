import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const bindings = {
  id: "01a06036-9b78-70bc-b9c0-1204d0737652",
  type: "file-property",
  slug: "bindings",
  propertySlug: "bindings",
  definition: "the keys an addon binds",
  extensions: ["xml"],
  fileName: "Bindings.xml",
  types: "ts",
} as const satisfies FileProperty
