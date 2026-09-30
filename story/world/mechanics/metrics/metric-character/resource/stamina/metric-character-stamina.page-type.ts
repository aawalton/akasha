import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterStamina = {
  id: "01a0f1f1-0f1b-7d99-ad27-2cbf826e5302",
  type: "page-type/page-type",
  slug: "metric-character-stamina",
  definition: "how much more exertion a character has left before tiring out",
  pluralSlug: "staminas",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's stamina is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story that calls stamina by a word of its own gives the page that word as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's stamina is spent and won back is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
