import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export type Markup = "xml"

export const markup = {
  id: "01a06036-9b76-717b-a048-8886a8382f29",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "markup",
  propertySlug: "markup",
  definition: "the XML a page is",
} as const satisfies FileProperty
