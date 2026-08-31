import type { NamedFileProperty } from "../../../pages-system/named-file-property/named-file-property.page-type.ts"

export type Main = "swift"

export const main = {
  id: "01a05901-26b4-73ac-9aeb-97eb22c92393",
  pageTypeSlug: "named-file-property",
  slug: "main",
  propertySlug: "main",
  definition: "where a program's run begins",
  fileName: "main.swift",
} as const satisfies NamedFileProperty
