import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const seatTurnColor = {
  id: "01a06964-d998-7c3e-8f55-91ff918f96ac",
  type: "module",
  slug: "seat-turn-color",
  definition: "the color a seat's turn state is drawn in, read off that state's own page",
  code: "ts",
  testFixtures: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A turn state's page is reached by that state's name as the page's slug.",
    },
    {
      invariantKind: "absence",
      statement: "No table turns a turn state's name into the name of that state's page.",
    },
    {
      invariantKind: "departure",
      statement: "The color reads back as the slug alone, whatever page type names it.",
    },
  ],
} as const satisfies Module
