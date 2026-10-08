import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const contributionPoint = {
  id: "01a0b78c-6b30-788a-85a1-935f3a46a786",
  type: "page-type/domain",
  slug: "contribution-point",
  definition:
    "the weight a contribution earns, committed to a feature request and spent when Alan builds it",
  parts: ["module/contribution-point-balance", "module/contribution-point-spending"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor boosts a published feature request with contribution points.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only a contributor proposes a feature request, paying points, and Alan publishes it.",
    },
  ],
  createdAt: "2026-09-19T02:43:48.144Z",
  updatedAt: "2026-09-21T23:40:00.000Z",
} as const satisfies Domain
