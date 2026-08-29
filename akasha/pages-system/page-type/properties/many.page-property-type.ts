import type { PagePropertyType } from "../../page-property-type/page-property-type.page-type.ts"

export type Many = boolean

export const many = {
  id: "01a04df3-6848-7846-a364-4343fd549e45",
  pageTypeSlug: "page-property-type",
  slug: "many",
  definition: "whether a page of this type carries more than one of the property",
  extendsSlug: "page-property-type/page-property",
  kind: "boolean",
} as const satisfies PagePropertyType
