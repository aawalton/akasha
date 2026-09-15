import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const rust = {
  id: "01a0602d-6acf-77c9-9f48-aa664c675afb",
  type: "page-type/code-file-property",
  slug: "rust",
  propertySlug: "rust",
  definition: "the Rust a page is",
  extensions: ["rs"],
  types: "ts",
} as const satisfies CodeFileProperty
