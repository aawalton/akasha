import type { CodeFileProperty } from "akasha/pages/code-file-properties/code-file-property.page-type.types.ts"

export const shell = {
  id: "01a05849-1564-7478-8fc5-2b62cc74068d",
  pageTypeSlug: "code-file-property",
  type: "code-file-property",
  slug: "shell",
  propertySlug: "shell",
  definition: "the shell a page is",
  extensions: ["sh"],
  writtenBy: "module-property-group/scripting",
  types: "ts",
} as const satisfies CodeFileProperty
