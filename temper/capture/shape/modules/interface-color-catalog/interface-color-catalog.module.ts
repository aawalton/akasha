import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const interfaceColorCatalog = {
  id: "01a0d3f5-9078-73ed-8bca-db2004eeec48",
  type: "page-type/module",
  slug: "interface-color-catalog",
  definition: "the shape the colors the game's engine gives its interface are written in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is kept under the type and the field the game is asked for it by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A color is kept as its four channels, each a fraction of the whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The colors are a list rather than a table keyed by number, so the saved file keeps each whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the game answers with is kept beside the colors it gave.",
    },
  ],
} as const satisfies Module
