import type { OneOfProperty } from "akasha/page/one-of-property/one-of-property.page-type.types.ts"

export const traitId = {
  id: "01a05fd1-d43e-71b5-b24b-b39383044c71",
  type: "page-type/one-of-property",
  slug: "trait-id",
  propertySlug: "trait-id",
  definition: "the trait a number the game has answers to",
  members: [
    "relation-property/armor-trait",
    "relation-property/weapon-trait",
    "relation-property/jewelry-trait",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is a page of the kind of piece that trait is worked into.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One name is a trait of two kinds of piece, so a bare name reaches two pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trait is named by its page's address rather than by its page's name alone.",
    },
  ],
  types: "ts",
} as const satisfies OneOfProperty
