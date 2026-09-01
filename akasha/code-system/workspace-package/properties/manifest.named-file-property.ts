import type { NamedFileProperty } from "@akasha/pages-system/named-file-property"

export type Manifest = "json"

export const manifest = {
  id: "01a05891-1ea3-7812-a163-a7b4dd664f62",
  pageTypeSlug: "named-file-property",
  slug: "manifest",
  propertySlug: "manifest",
  definition: "what a package states about itself",
  fileName: "package.json",
} as const satisfies NamedFileProperty
