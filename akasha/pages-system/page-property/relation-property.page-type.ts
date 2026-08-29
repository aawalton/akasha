import type { TargetPageTypeSlug } from "../page-property-type/properties/target-page-type-slug.page-property-type.ts"
import type { PageType } from "../page-type/page-type.page-type.ts"
import type { PageProperty } from "./page-property.page-type.ts"

export type RelationProperty = PageProperty & {
  targetPageTypeSlug: TargetPageTypeSlug
}

export const relationProperty = {
  id: "01a04dff-9d7d-7809-9a88-4fd343f11772",
  pageTypeSlug: "page-type",
  slug: "relation-property",
  definition: "a page property naming another page",
  extendsSlug: "page-type/page-property",
  properties: [
    { propertySlug: "page-property-type/target-page-type-slug", required: true, many: false },
  ],
} as const satisfies PageType
