import type { PageProperty } from "../page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type FileProperty = PageProperty

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  pageTypeSlug: "page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  pluralSlug: "file-properties",
  extendsSlug: "page-type/page-property",
} as const satisfies PageType
