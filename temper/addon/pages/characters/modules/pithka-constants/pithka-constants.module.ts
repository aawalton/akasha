import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pithkaConstants = {
  id: "01a0de7b-0703-7f1f-aeb1-9d5b538250c4",
  type: "page-type/module",
  slug: "pithka-constants",
  definition: "the sizes, colors, fonts and textures the achievement tracker draws with",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tracker's text colors are the game's own, read through the shared text roles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tracker's fonts are the game's own.",
    },
  ],
  createdAt: "2026-09-26T16:09:59.811Z",
  updatedAt: "2026-10-18T20:08:18.328Z",
} as const satisfies Module
