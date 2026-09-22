import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treasureIcons = {
  id: "01a061d5-d0b4-719c-ba34-e58d5ca2aa19",
  type: "page-type/module",
  slug: "treasure-icons",
  definition: "the textures a treasure pin is drawn with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every texture offered is one the game itself ships.",
    },
  ],
} as const satisfies Module
