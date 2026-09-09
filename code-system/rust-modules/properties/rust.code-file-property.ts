import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type Rust = "rs"

export const rust = {
  id: "01a0602d-6acf-77c9-9f48-aa664c675afb",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "rust",
  propertySlug: "rust",
  definition: "the Rust a page is",
} as const satisfies CodeFileProperty
