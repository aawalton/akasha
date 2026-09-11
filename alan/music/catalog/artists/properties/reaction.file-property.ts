import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const reaction = {
  id: "01a06243-144b-7011-8f74-d30df7a6c48b",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "reaction",
  propertySlug: "reaction",
  definition: "what Alan said about an artist when he read them",
  extensions: ["txt"],
  types: "ts",
} as const satisfies FileProperty
