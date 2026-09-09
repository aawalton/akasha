import type { PageProperty } from "../types/page-properties/page-property.page-type.ts"
import type { PageType } from "../types/page-type.page-type.ts"
import type { TargetPageType } from "./properties/target-page-type.relation-property.ts"

export type RelationProperty = PageProperty & {
  targetPageType: TargetPageType
}

export const relationProperty = {
  id: "01a04dff-9d7d-7809-9a88-4fd343f11772",
  pageTypeSlug: "page-type",
  slug: "relation-property",
  definition: "a page property naming another page",
  pluralSlug: "relation-properties",
  partSlugs: ["relation-property/target-page-type"],
  extends: ["page-type/page-property"],
  properties: [
    { pagePropertySlug: "relation-property/target-page-type", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A relation is the edge rather than the page the edge reaches.",
    },
    {
      invariantKind: "departure",
      statement:
        "Two edges meaning different things are two relations though each edge reaches one type.",
    },
  ],
} as const satisfies PageType
