import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const baseRolesKeeping = {
  id: "01a0e07a-3589-7aed-b335-183201e914e3",
  type: "page-type/change-generator",
  slug: "base-roles-keeping",
  definition: "the roles a companion build may name, written again from the base role pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A build may name every base role page's key and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The roles are written in the display order their pages state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A base role page added, taken away or given a new key writes the roles again.",
    },
  ],
} as const satisfies ChangeGenerator
