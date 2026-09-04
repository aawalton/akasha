import type { PageType } from "@akasha/pages-system/page-type"
import type { KiCollectionTemplate } from "../ki-collection-templates/ki-collection-template.page-type.ts"

export type KiSeason = KiCollectionTemplate

export const kiSeason = {
  id: "01a06825-d0ec-7400-bf71-2d0c0b75b3be",
  pageTypeSlug: "page-type",
  slug: "ki-season",
  definition: "one run of episodes of a show Ki watches",
  pluralSlug: "ki-seasons",
  extendsSlug: "page-type/ki-collection-template",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A season of Ki's names the show it is part of.",
    },
    {
      invariantKind: "departure",
      statement: "A season of Ki's names the episodes it holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A season of Ki's has its length summed from its episodes rather than written on it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A season of Ki's has its progress summed from its episodes rather than written on it.",
    },
  ],
} as const satisfies PageType
