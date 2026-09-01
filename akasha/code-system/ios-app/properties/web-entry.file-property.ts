import type { FileProperty } from "@akasha/pages-system/file-property"

export type WebEntry = "html"

export const webEntry = {
  id: "01a05934-fe0f-72e8-849f-599ed322020e",
  pageTypeSlug: "file-property",
  slug: "web-entry",
  propertySlug: "web-entry",
  definition: "the page a shell boots before it reaches its site",
} as const satisfies FileProperty
