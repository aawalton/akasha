import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const derivation = {
  id: "01a0657f-5da8-7ebc-add0-4f0e54c7b09a",
  type: "file-property",
  slug: "derivation",
  propertySlug: "derivation",
  definition: "the numbered lines a proof is worked out in",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
