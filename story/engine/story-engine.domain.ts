import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  type: "page-type/domain",
  slug: "story-engine",
  definition: "the code a story is played through",
  parts: [
    "domain/narrative-story-turn-promotion",
    "domain/story-engine-core",
    "page-type/doctrine",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No deployed code names one story or one world.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "Every word a game master is served changes without a deploy.",
    },
  ],
} as const satisfies Domain
