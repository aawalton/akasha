import type { FileProperty } from "../../../pages-system/file-property/file-property.page-type.ts"

export type Shell = "sh"

export const shell = {
  id: "01a05849-1564-7478-8fc5-2b62cc74068d",
  pageTypeSlug: "file-property",
  slug: "shell",
  propertySlug: "shell",
  definition: "the shell a page is",
} as const satisfies FileProperty
