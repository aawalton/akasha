import type { FileProperty } from "@akasha/pages/file-property"

export type Curation = "json"

export const curation = {
  id: "01a08197-ec67-7f32-bb2b-ed882a15dda3",
  pageTypeSlug: "file-property",
  slug: "curation",
  propertySlug: "curation",
  definition: "the root of a curation, naming the parts merged into it",
  fileName: "ast-unused.config.json",
} as const satisfies FileProperty
