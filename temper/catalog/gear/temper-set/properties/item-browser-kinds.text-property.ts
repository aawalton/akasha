import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const itemBrowserKinds = {
  id: "01a0d8e1-f7c1-7b78-86c1-df981ef055de",
  type: "page-type/text-property",
  slug: "item-browser-kinds",
  propertySlug: "item-browser-kinds",
  definition: "the marks the item browser gives a set's row that no piece type shows",
  maxLength: 40,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row drawn in the player's alliance style is marked `alliance-style`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row drawn in the style chosen for many-style sets is marked `multi-style`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row drawn in the style `item-browser-style` names is marked `manual-style`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row showing a jewelry piece of a set with other pieces is marked `jewelry`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every other mark a row has is worked out from the set's kind and its pieces' types.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
