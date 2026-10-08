import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalProse = {
  id: "01a09c40-a897-7d20-9d17-1f99d21f3ebb",
  type: "page-type/domain",
  slug: "change-mechanical-prose",
  definition: "a mechanical change to prose on every page",
  parts: ["change-mechanical/change-prose-pattern"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung here answers for every passage the repository states at once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No rung here reaches a rung beneath once for each passage.",
    },
  ],
  createdAt: "2026-09-13T19:31:18.295Z",
  updatedAt: "2026-09-25T13:51:13.000Z",
} as const satisfies Domain
