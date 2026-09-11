import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const main = {
  id: "01a05901-26b4-73ac-9aeb-97eb22c92393",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "main",
  propertySlug: "main",
  definition: "where a program's run begins",
  extensions: ["swift"],
  fileName: "main.swift",
  types: "ts",
} as const satisfies CodeFileProperty
