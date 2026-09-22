import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsConstTextures = {
  id: "01a061d7-7bc5-727f-88ac-49e2a8ab5686",
  type: "page-type/module",
  slug: "sets-const-textures",
  definition: "the game's own armour, weapon and Undaunted chest keeper names, filed per language",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A supported language table that is not English is given the English table as its fallback.",
    },
  ],
} as const satisfies Module
