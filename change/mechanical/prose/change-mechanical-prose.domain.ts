import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalProse = {
  id: "01a09c40-a897-7d20-9d17-1f99d21f3ebb",
  type: "domain",
  slug: "change-mechanical-prose",
  definition: "a mechanical change acting on the English the pages state",
  parts: ["change-mechanical/change-prose-pattern"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here answers for every passage the repository states at once.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here reaches a rung beneath once for each passage.",
    },
  ],
} as const satisfies Domain
