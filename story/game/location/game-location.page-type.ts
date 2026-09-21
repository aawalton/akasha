import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gameLocation = {
  id: "01a0c642-a40f-7f5e-8d0d-b1f9226535ca",
  type: "page-type/page-type",
  slug: "game-location",
  definition: "a place a game is played through",
  pluralSlug: "locations",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/holding-game", required: true, many: false },
    { pageProperty: "relation-property/within-location", required: false, many: false },
    { pageProperty: "number-property/location-depth", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A place inside another place is a place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A location belongs to one game.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A location sits under the game it is played through.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No location holds what is happening in it now.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["relation-property/within-location", "number-property/location-depth"],
} as const satisfies PageType
