import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const playedPanel = {
  id: "01a0c49e-6107-758a-9dfe-efd394605239",
  type: "page-type/page-type",
  slug: "played-panel",
  definition: "a part of a play screen, drawn by the code beside that panel's page",
  extends: ["page-type/module"],
  parts: [
    "module/panel-drawing",
    "played-panel/tower-hud",
    "module/pool-panel",
    "played-panel/quest-list",
    "played-panel/story-so-far",
    "module/panel-turning",
    "file-property/drawn",
    "module/panel-showing",
    "module/panel-offering",
    "module/panel-loading",
    "relation-property/drawn-in",
    "page-type/panel-place",
    "change-generator/played-panel-drawing",
    "played-panel/scene-cover",
    "played-panel/time",
    "played-panel/tower-player-character",
    "played-panel/player-character",
    "played-panel/player-intent",
    "played-panel/otherwhere-the-library-player-character",
    "played-panel/other-characters",
    "played-panel/otherwhere-the-library-map",
    "number-property/panel-position",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is reached by the address that panel is filed under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story played names the panels its play screen shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every play screen draws its panels in the one order their positions give.",
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
    { pageProperty: "number-property/panel-position", required: true, many: false },
  ],
} as const satisfies PageType
