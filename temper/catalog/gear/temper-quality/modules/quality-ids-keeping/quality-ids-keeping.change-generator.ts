import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const qualityIdsKeeping = {
  id: "01a0e0a8-7160-766c-96b0-5e5e75e3adf9",
  type: "page-type/change-generator",
  slug: "quality-ids-keeping",
  definition: "the types naming every quality by its id, written again from the quality pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types are written by a machine from the quality pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quality's id is its page's slug.",
    },
  ],
} as const satisfies ChangeGenerator
