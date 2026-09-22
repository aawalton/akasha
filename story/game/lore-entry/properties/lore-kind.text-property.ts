import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const loreKind = {
  id: "01a0c949-bb04-7bc5-bf94-735c03299640",
  type: "page-type/text-property",
  slug: "lore-kind",
  propertySlug: "kind",
  definition: "what sort of thing a lore entry settles",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity entry states one attribute of one thing in the world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A thread entry states a question the play has opened and whether it is closed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A timeline entry states one beat of what happened, in the order it happened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A quote entry states a line somebody said and who said it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
