import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const pithkaGroupFinderLayout = {
  id: "01a0dea5-6b22-7451-9153-899d8dba0685",
  type: "page-type/eso-interface",
  slug: "pithka-group-finder-layout",
  definition: "the group finder window and the listing card each group it finds is drawn in",
  markup: "xml",
  loadedAs: "TemperCharactersPithkaGroupFinder.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The markup is Pithka's Achievement Tracker's own, with its global names renamed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The window's frame, title and close are the shared window frame's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Its text takes the game's own fonts, and its footer the game's inset art.",
    },
  ],
  createdAt: "2026-09-26T16:56:17.954Z",
  updatedAt: "2026-10-18T20:08:18.328Z",
} as const satisfies EsoInterface
