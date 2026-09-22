import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const kiEpisode = {
  id: "01a06825-d0ec-79a7-aa75-2b13b1b20f22",
  type: "page-type/page-type",
  slug: "ki-episode",
  definition: "an instalment of a season Ki watches",
  extends: ["page-type/ki-collection-template"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An episode of Ki's names the season that episode is part of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An episode of Ki's states its season's number beside the season that episode names.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
