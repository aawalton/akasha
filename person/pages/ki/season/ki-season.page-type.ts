import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiSeason = {
  id: "01a06825-d0ec-7400-bf71-2d0c0b75b3be",
  type: "page-type/page-type",
  slug: "ki-season",
  definition: "a run of episodes of a show Ki watches",
  extends: ["page-type/ki-collection-template"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A season of Ki's names the show that season is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A season of Ki's names the episodes that season has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A season of Ki's has its length summed from its episodes rather than written on that season.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A season of Ki's has its progress summed from its episodes rather than written on that season.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
