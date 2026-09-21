import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gamePanel = {
  id: "01a0c49e-6107-758a-9dfe-efd394605239",
  type: "page-type/page-type",
  slug: "game-panel",
  definition: "a part of a game's interface, drawn by the code beside that panel's page",
  extends: ["page-type/module"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is reached by the address that panel is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game names the panels its interface is made of, in the order they are drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is loaded from the pages rather than built with the app.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No list in the app names the panels that can be drawn.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  loadedExport: ["Panel"],
} as const satisfies PageType
