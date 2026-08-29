import type { PageProperty } from "../page-property/page-property.page-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"

export type BooleanProperty = PageProperty

export const booleanProperty = {
  id: "01a04dff-9d7d-7fd5-9836-5f16e5cc63d0",
  pageTypeSlug: "page-type",
  slug: "boolean-property",
  definition: "a page property holding true or false",
  pluralSlug: "boolean-properties",
  extendsSlug: "page-type/page-property",
} as const satisfies PageType
