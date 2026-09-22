import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const derivation = {
  id: "01a0657f-5da8-7ebc-add0-4f0e54c7b09a",
  type: "page-type/file-property",
  slug: "derivation",
  propertySlug: "derivation",
  definition: "a proof's numbered lines",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
