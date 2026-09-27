import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const statusEffectTypeIdsKeeping = {
  id: "01a0e0b6-d3f0-78a8-b6a6-785c6a76b5a1",
  type: "page-type/change-generator",
  slug: "status-effect-type-ids-keeping",
  definition: "the type naming every status effect type by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the status effect type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A status effect type's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
