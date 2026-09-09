import type { Module } from "@akasha/code/module"

export const seatTurnColor = {
  id: "01a06964-d998-7c3e-8f55-91ff918f96ac",
  pageTypeSlug: "module",
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
  ],
} as const satisfies Module
