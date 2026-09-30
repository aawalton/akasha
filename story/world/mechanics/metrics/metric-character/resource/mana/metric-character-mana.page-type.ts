import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterMana = {
  id: "01a0f1f1-0f1b-7bc7-8066-465a59efd9cf",
  type: "page-type/page-type",
  slug: "metric-character-mana",
  definition: "the magic a character has left to spend",
  pluralSlug: "manas",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's mana is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story that calls mana by a word of its own gives the page that word as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's mana is spent and won back is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
