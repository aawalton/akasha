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
      statement:
        "Every type from the game's first to its last is asked for, by the bounds the game declares.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game declares no bound on a type's fields.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each type is asked for a fixed run of fields, wider than any type the game has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field the game answers with no color at all is passed over.",
    },
  ],
} as const satisfies Module
