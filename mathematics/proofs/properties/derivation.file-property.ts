import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Derivation = "txt"

export const derivation = {
  id: "01a0657f-5da8-7ebc-add0-4f0e54c7b09a",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "derivation",
  propertySlug: "derivation",
  definition: "the numbered lines a proof is worked out in",
} as const satisfies FileProperty
