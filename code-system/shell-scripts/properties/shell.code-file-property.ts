import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export type Shell = "sh"

export const shell = {
  id: "01a05849-1564-7478-8fc5-2b62cc74068d",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "shell",
  propertySlug: "shell",
  definition: "the shell a page is",
} as const satisfies CodeFileProperty
