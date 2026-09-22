import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const mainMenuKeyboard = {
  id: "01a0605b-c803-7076-8256-6e18f678aa85",
  type: "page-type/module",
  slug: "main-menu-keyboard",
  definition: "the keyboard main menu object the game itself puts up",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The game owns the object reached here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every reach for the game's menu goes through this one module.",
    },
  ],
} as const satisfies Module
