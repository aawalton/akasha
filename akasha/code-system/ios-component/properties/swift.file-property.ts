import type { FileProperty } from "../../../pages-system/file-property/file-property.page-type.ts"

export type Swift = "swift"

export const swift = {
  id: "01a05474-5474-79c9-8775-7972372e85d6",
  pageTypeSlug: "file-property",
  slug: "swift",
  propertySlug: "swift",
  definition: "the Swift a page is",
} as const satisfies FileProperty
