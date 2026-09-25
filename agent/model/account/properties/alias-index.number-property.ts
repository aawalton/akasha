import type { NumberProperty } from "akasha/page/number-property/number-property.page-type.types.ts"

export const aliasIndex = {
  id: "01a054d8-1d39-7b15-a48d-62c2122c274b",
  type: "page-type/number-property",
  slug: "alias-index",
  propertySlug: "alias-index",
  definition: "the number in the name that opens an agent on a model account in the shell",
  max: null,
  unique: "unique-kind/page-type",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The alias `c3` opens the account with the alias index 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index freed by a departing account is not handed to another account.",
    },
  ],
  types: "ts",
} as const satisfies NumberProperty
