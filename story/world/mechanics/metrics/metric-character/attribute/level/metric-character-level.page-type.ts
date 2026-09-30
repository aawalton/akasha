import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterLevel = {
  id: "01a0f1f1-0f1a-7f86-8d79-8bb204a13d21",
  type: "page-type/page-type",
  slug: "metric-character-level",
  definition: "the level a character has reached",
  pluralSlug: "levels",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's level is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a level takes and what it gives is its story's own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
