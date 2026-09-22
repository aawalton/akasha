import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mapPinsHelpers = {
  id: "01a06062-57de-7676-a2c3-268d8233dc41",
  type: "page-type/module",
  slug: "map-pins-helpers",
  definition: "the pin type and map filter group lookups the rest of this feature reads",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A pin type named by a string is looked up in the game's global table.",
    },
  ],
} as const satisfies Module
