import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const changeMechanicalProseChange = {
  id: "01a09c40-8b07-77e8-8ea1-cfebf9945c5a",
  type: "domain",
  slug: "change-mechanical-prose-change",
  definition: "a mechanical change restating the English the pages state",
  parts: ["change-mechanical/change-prose-pattern"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rung here restates a passage where a pair says what is written instead.",
    },
    {
      invariantKind: "absence",
      statement: "No rung here takes a passage away.",
    },
  ],
} as const satisfies Domain
