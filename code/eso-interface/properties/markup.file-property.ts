import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const markup = {
  id: "01a06036-9b76-717b-a048-8886a8382f29",
  type: "page-type/file-property",
  slug: "markup",
  propertySlug: "markup",
  definition: "the XML a page is",
  extensions: ["xml"],
  types: "ts",
} as const satisfies FileProperty
