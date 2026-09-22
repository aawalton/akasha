import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudSceneSource = {
  id: "01a060a4-fa39-75fa-b8ed-cd9e167bd81c",
  type: "page-type/module",
  slug: "hud-scene-source",
  definition: "the game file holding every catalogued HUD part",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The path is written from the root of the game's UI source clone.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file.",
    },
  ],
} as const satisfies Module
