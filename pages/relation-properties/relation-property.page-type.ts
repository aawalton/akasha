import type { TargetPageTypeSlug } from "../page-properties/properties/target-page-type-slug.relation-property.ts"
import type { PageProperty } from "../page-types/page-properties/page-property.page-type.ts"
import type { PageType } from "../page-types/page-type.page-type.ts"

export type RelationProperty = PageProperty & {
  targetPageTypeSlug: TargetPageTypeSlug
}

export const relationProperty = {
  id: "01a04dff-9d7d-7809-9a88-4fd343f11772",
  pageTypeSlug: "page-type",
  slug: "relation-property",
  definition: "a page property naming another page",
  pluralSlug: "relation-properties",
  partSlugs: ["relation-property/target-page-type-slug"],
  extendsSlug: ["page-type/page-property"],
  properties: [{ pagePropertySlug: "target-page-type-slug", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relation is the edge rather than the page the edge reaches.",
    },
    {
      invariantKind: "departure",
      statement: "Two edges meaning different things are two relations though both reach one type.",
    },
  ],
} as const satisfies PageType
