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
  createdAt: "2026-09-02T11:18:27.013Z",
  updatedAt: "2026-09-22T14:23:15.000Z",
} as const satisfies Module
