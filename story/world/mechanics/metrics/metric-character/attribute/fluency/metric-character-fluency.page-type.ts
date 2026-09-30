import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterFluency = {
  id: "01a0f1f1-0f19-7ecc-ad4c-f09a5885d401",
  type: "page-type/page-type",
  slug: "metric-character-fluency",
  definition: "how much of one tongue or one script a character knows",
  pluralSlug: "fluencies",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's fluencies are pages of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fluency's slug is its character's slug, then the tongue or script it is in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's fluency is learned is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
