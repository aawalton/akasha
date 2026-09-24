import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const interfaceColorCatalogCapture = {
  id: "01a0d3f5-a80a-76c3-b935-bc7d8901eb90",
  type: "page-type/module",
  slug: "interface-color-catalog-capture",
  definition: "the collector reading every color the game's engine gives its interface",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game's documentation names a color's type and field and gives no color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field outside what a color type has is never asked for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A type is asked only for the fields of the family the game's own code pairs it with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A family's fields run between the bounds the game declares for that family.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A family of flags is asked for each flag rather than each number between.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A family the game declares no bounds for is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the game answers with no color at all is passed over.",
    },
  ],
} as const satisfies Module
