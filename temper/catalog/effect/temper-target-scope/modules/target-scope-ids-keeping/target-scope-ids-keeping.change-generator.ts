import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const targetScopeIdsKeeping = {
  id: "01a0e0b7-bac5-75a0-b114-6ba6dc4e4834",
  type: "page-type/change-generator",
  slug: "target-scope-ids-keeping",
  definition: "the type naming every target scope by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the target scope pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target scope's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
