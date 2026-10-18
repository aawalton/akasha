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
      statement:
        "The main panel's controls move by the frame's margins, and its options sit in the title row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The main panel's text takes the text-style roles, and each backdrop it holds is a panel.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each backdrop a crafting window's markup declares takes the game's inset art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop behind a button is cleared, so the button shows the game's own art.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A backdrop behind a field takes the game's text entry art.",
    },
  ],
  createdAt: "2026-09-25T13:31:58.849Z",
  updatedAt: "2026-10-18T17:44:21.596Z",
} as const satisfies Module
