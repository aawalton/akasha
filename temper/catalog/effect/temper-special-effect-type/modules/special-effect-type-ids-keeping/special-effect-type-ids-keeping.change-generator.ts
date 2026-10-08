import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const specialEffectTypeIdsKeeping = {
  id: "01a0e0b7-5e01-7336-94de-5abca5d25946",
  type: "page-type/change-generator",
  slug: "special-effect-type-ids-keeping",
  definition: "the type naming every special effect type by its id, written again from its pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The type is written by a machine from the special effect type pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A special effect type's id is its page's slug.",
    },
  ],
  createdAt: "2026-09-27T02:35:08.673Z",
  updatedAt: "2026-09-27T02:35:12.000Z",
} as const satisfies ChangeGenerator
