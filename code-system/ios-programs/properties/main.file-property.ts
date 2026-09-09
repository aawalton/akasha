import type { FileProperty } from "@akasha/pages/file-property"

export type Main = "swift"

export const main = {
  id: "01a05901-26b4-73ac-9aeb-97eb22c92393",
  pageTypeSlug: "file-property",
  slug: "main",
  propertySlug: "main",
  definition: "where a program's run begins",
  fileName: "main.swift",
} as const satisfies FileProperty
