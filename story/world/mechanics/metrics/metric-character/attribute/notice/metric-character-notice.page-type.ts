import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterNotice = {
  id: "01a0f1f1-0f1a-7551-baa6-51c93315d5c4",
  type: "page-type/page-type",
  slug: "metric-character-notice",
  definition: "how much attention a character has drawn from one party",
  pluralSlug: "notices",
  extends: ["page-type/metric-character-attribute"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's notice is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice's slug is its character's slug, then the party whose notice it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's notice is drawn and what it brings is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
