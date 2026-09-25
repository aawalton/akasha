import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const craftWindowFrames = {
  id: "01a0d8c4-0001-7ea2-88c2-7e79f5cc462e",
  type: "page-type/module",
  slug: "craft-window-frames",
  definition: "the crafting station's own windows set in the shared window frame",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A crafting window's own controls sit in the frame's body, and the window fits them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window the station opens and closes has no cross of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each named section of a crafting window is a panel, and its divider is cleared.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A crafting window's category buttons are tabs, and its fields sit a level above.",
    },
  ],
} as const satisfies Module
