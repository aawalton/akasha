import type { PagePropertyType } from "../page-property-type/page-property-type.page-type.ts"

export const pageProperty = {
  id: "01a04df1-5567-79a4-93da-546fd874363c",
  pageTypeSlug: "page-property-type",
  slug: "page-property",
  definition: "one value a page carries",
  extendsSlug: null,
  kind: "root",
} as const satisfies PagePropertyType
