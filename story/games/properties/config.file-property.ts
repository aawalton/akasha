import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Config = "json"

export const config = {
  id: "01a0673c-8e0e-700e-8725-0fde8988e810",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "config",
  propertySlug: "config",
  definition: "what a game is set to run as",
} as const satisfies FileProperty
