import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const metricCharacterExperience = {
  id: "01a0f1f1-0f1b-7070-b95e-646c0c05316e",
  type: "page-type/page-type",
  slug: "metric-character-experience",
  definition: "what a character has earned toward the next step up",
  pluralSlug: "experiences",
  extends: ["page-type/metric-character-resource"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every story's experience is a page of this one kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story that calls experience by a word of its own gives the page that word as its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "How a story's experience is earned and spent is its own mechanic's business.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
