import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterPoint = {
  id: "01a17eb5-d80d-72e5-8c0a-53380a0f0aee",
  type: "page-type/page-type",
  slug: "metric-character-point",
  definition: "points a character has left to spend",
  pluralSlug: "points",
  extends: ["page-type/metric-character-resource"],
  parts: [
    "page-type/tower-of-nimue-free-point",
    "page-type/test-story-points",
    "page-type/gifted-unallocated-stats",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each story's points left to spend are pages of a kind extending this one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's points are earned and spent is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-27T18:53:28.972Z",
  updatedAt: "2026-10-27T20:05:18.843Z",
} as const satisfies PageType
