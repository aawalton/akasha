import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterStat = {
  id: "01a0f1f1-0f1a-7b1a-991e-4e618a6cd0e3",
  type: "page-type/page-type",
  slug: "metric-character-stat",
  definition: "one lasting number for how able a character is in one way",
  pluralSlug: "stats",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's stats are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat's slug is its character's slug, then the stat's own name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stat whose name its slug cannot spell gives that name as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which stats a story keeps and how they rise is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
