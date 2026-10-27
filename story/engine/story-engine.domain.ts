import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  type: "page-type/domain",
  slug: "story-engine",
  definition: "the code that plays a story",
  parts: [
    "domain/beat-state",
    "domain/narrative-story-turn-promotion",
    "domain/story-engine-core",
    "module/phase-timing",
    "domain/voyage",
    "domain/kokoro-tts",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/absence",
      statement: "No deployed code names one story or one world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every word a game master is served changes without a deploy.",
    },
  ],
  createdAt: "2026-09-02T14:23:28.546Z",
  updatedAt: "2026-10-27T18:40:02.793Z",
} as const satisfies Domain
