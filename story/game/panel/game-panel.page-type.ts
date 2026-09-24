import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gamePanel = {
  id: "01a0c49e-6107-758a-9dfe-efd394605239",
  type: "page-type/page-type",
  slug: "game-panel",
  definition: "a part of a game's interface, drawn by the code beside that panel's page",
  extends: ["page-type/module"],
  parts: [
    "module/panel-drawing",
    "game-panel/tower-hud",
    "module/pool-panel",
    "game-panel/hotel-hud",
    "game-panel/character-sheet",
    "game-panel/quest-list",
    "game-panel/story-so-far",
    "game-panel/aravel-hud",
    "module/panel-turning",
    "file-property/drawn",
    "module/panel-showing",
    "module/panel-offering",
    "module/panel-loading",
    "relation-property/drawn-in",
    "page-type/panel-place",
    "game-panel/prose-channel",
    "change-generator/game-panel-drawing",
  ],
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
  properties: [
    { pageProperty: "file-property/drawn", required: false, many: false },
    { pageProperty: "relation-property/drawn-in", required: true, many: false },
  ],
} as const satisfies PageType
