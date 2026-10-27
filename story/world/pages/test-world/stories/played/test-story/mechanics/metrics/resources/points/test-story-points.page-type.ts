import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const testStoryPoints = {
  id: "01a17ec7-2024-70e5-971c-bfec40996a03",
  type: "page-type/page-type",
  slug: "test-story-points",
  definition: "the unspent attribute points a character in the test story holds",
  extends: ["page-type/metric-character-point"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character earns attribute points on a level up, and spends each on one stat.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T19:12:21.539Z",
  updatedAt: "2026-10-27T19:12:21.539Z",
} as const satisfies PageType
