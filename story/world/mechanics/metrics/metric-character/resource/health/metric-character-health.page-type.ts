import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterHealth = {
  id: "01a0f1f1-0f1b-7d96-9b01-7a6e4b6419b0",
  type: "page-type/page-type",
  slug: "metric-character-health",
  definition: "how much more harm a character can take before going down",
  pluralSlug: "healths",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's health is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story that calls health by a word of its own gives the page that word as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's health is lost and won back is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
