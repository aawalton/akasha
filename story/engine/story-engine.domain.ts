import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const storyEngine = {
  id: "01a06280-e122-7ba3-844e-c8a0f133106d",
  pageTypeSlug: "domain",
  slug: "story-engine",
  definition: "the code a story is played through",
  invariants: [
    {
      invariantKind: "absence",
      statement: "No deployed code names one story or one world.",
    },
    {
      invariantKind: "gap",
      statement: "Every word a game master is served changes without a deploy.",
    },
  ],
} as const satisfies Domain
