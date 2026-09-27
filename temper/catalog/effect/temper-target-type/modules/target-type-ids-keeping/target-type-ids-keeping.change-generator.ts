import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const targetTypeIdsKeeping = {
  id: "01a0e0b8-1629-77ee-bb85-17302aa960ea",
  type: "page-type/change-generator",
  slug: "target-type-ids-keeping",
  definition: "the type naming every target type by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the target type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A target type's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
