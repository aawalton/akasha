import type { Module } from "@akasha/code-system/module"

export const mainMenuKeyboard = {
  id: "01a0605b-c803-7076-8256-6e18f678aa85",
  pageTypeSlug: "module",
  slug: "main-menu-keyboard",
  definition: "the keyboard main menu object the game itself puts up",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "The game owns the object reached here.",
    },
    {
      invariantKind: "departure",
      statement: "Every reach for the game's menu goes through this one module.",
    },
  ],
} as const satisfies Module
