import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const narrativeProduction = {
  id: "01a0673a-bc3a-7002-900d-98d54a36587e",
  type: "page-type/domain",
  slug: "narrative-production",
  definition: "turning a story into narration and illustration",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture is made for one chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's picture is rendered from the chapter rather than kept as a page of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A change that makes narration sound better is made without asking Alan, who reports what he hears.",
    },
  ],
  createdAt: "2026-09-03T12:24:57.658Z",
  updatedAt: "2026-10-08T18:57:11.853Z",
} as const satisfies Domain
