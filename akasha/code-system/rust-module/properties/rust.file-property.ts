import type { FileProperty } from "@akasha/pages-system/file-property"

export type Rust = "rs"

export const rust = {
  id: "01a0602d-6acf-77c9-9f48-aa664c675afb",
  pageTypeSlug: "file-property",
  slug: "rust",
  propertySlug: "rust",
  definition: "the Rust a page is",
} as const satisfies FileProperty
