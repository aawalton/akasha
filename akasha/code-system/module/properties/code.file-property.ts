import type { FileProperty } from "../../../pages-system/file-property/file-property.page-type.ts"

export type Code = "ts" | "swift"

export const code = {
  id: "01a04a20-6e04-7e3d-88e8-a8af6fd9c02b",
  pageTypeSlug: "file-property",
  slug: "code",
  propertySlug: "code",
  definition: "the code a page is",
} as const satisfies FileProperty
