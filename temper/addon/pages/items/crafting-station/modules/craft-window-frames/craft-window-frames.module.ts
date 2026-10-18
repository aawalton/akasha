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
      statement: "A crafting window's sections, dividers and buttons keep the game's art.",
    },
  ],
  createdAt: "2026-09-25T13:31:58.849Z",
  updatedAt: "2026-10-18T17:31:39.160Z",
} as const satisfies Module
