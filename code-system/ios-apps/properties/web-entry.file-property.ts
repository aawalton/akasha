import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const webEntry = {
  id: "01a05934-fe0f-72e8-849f-599ed322020e",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "web-entry",
  propertySlug: "web-entry",
  definition: "the page a shell boots before it reaches its site",
  extensions: ["html"],
  types: "ts",
} as const satisfies FileProperty
