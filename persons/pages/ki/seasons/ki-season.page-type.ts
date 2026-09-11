import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const kiSeason = {
  id: "01a06825-d0ec-7400-bf71-2d0c0b75b3be",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "ki-season",
  definition: "one run of episodes of a show Ki watches",
  pluralSlug: "ki-seasons",
  extends: ["page-type/ki-collection-template"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A season of Ki's names the show that season is part of.",
    },
    {
      invariantKind: "departure",
      statement: "A season of Ki's names the episodes that season has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A season of Ki's has its length summed from its episodes rather than written on that season.",
    },
    {
      invariantKind: "departure",
      statement:
        "A season of Ki's has its progress summed from its episodes rather than written on that season.",
    },
  ],
  types: "ts",
} as const satisfies PageType
