import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const rust = {
  id: "01a0602d-6acf-77c9-9f48-aa664c675afb",
  type: "code-file-property",
  slug: "rust",
  propertySlug: "rust",
  definition: "the Rust a page is",
  extensions: ["rs"],
  types: "ts",
} as const satisfies CodeFileProperty
