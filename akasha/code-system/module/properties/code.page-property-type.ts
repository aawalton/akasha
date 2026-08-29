import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type Code = "ts"

export const code = {
  id: "01a04a20-6e04-7e3d-88e8-a8af6fd9c02b",
  pageTypeSlug: "page-property-type",
  slug: "code",
  definition: "the code a page is, held in a file of its own",
  extendsSlug: "page-property-type/page-property",
  kind: "file",
} as const satisfies PagePropertyType
