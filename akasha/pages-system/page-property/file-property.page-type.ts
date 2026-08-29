import type { PageType } from "../page-type/page-type.page-type.ts"
import type { PageProperty } from "./page-property.page-type.ts"

export type FileProperty = PageProperty

export const fileProperty = {
  id: "01a04dff-9d7d-7487-9a08-2485e897542f",
  pageTypeSlug: "page-type",
  slug: "file-property",
  definition: "a page property held in its own file",
  extendsSlug: "page-type/page-property",
} as const satisfies PageType
