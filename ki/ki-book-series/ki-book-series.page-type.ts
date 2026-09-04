import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiBookSeries = KiCollectionTemplate

export const kiBookSeries = {
  id: "01a06825-d0ec-7bfd-b89f-ecf2d7fbbaad",
  pageTypeSlug: "page-type",
  slug: "ki-book-series",
  definition: "the books Ki keeps that carry one story in order",
  pluralSlug: "ki-book-series",
  extendsSlug: "page-type/ki-collection-template",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A series of Ki's holds nothing of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A series of Ki's names no book.",
    },
    {
      invariantKind: "departure",
      statement: "The books a series of Ki's holds are the books naming that series.",
    },
  ],
} as const satisfies PageType
