import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const gearKindIdsKeeping = {
  id: "01a0e0c4-2114-7d87-b183-c05bdf641d05",
  type: "page-type/change-generator",
  slug: "gear-kind-ids-keeping",
  definition: "the types naming every slot and armor weight, written again from their pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types are written by a machine from the slot and weight pages, not an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slot's or a weight's id is its page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A weight a build may pick is standard, and every other weight is named apart.",
    },
  ],
} as const satisfies ChangeGenerator
