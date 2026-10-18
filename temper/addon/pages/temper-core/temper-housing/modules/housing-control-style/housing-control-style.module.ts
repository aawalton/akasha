import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingControlStyle = {
  id: "01a0da26-43d4-7903-9b88-282b7b63df67",
  type: "page-type/module",
  slug: "housing-control-style",
  definition: "giving the house-travel window's fields and buttons the game's look",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field and button in the window takes window-controls' look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The window is styled once its tabs are built, before the frame styles it for the window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A list styles the rows it makes each time it fills, so a row made later looks the same.",
    },
  ],
  createdAt: "2026-09-25T19:58:55.956Z",
  updatedAt: "2026-10-18T17:31:39.160Z",
} as const satisfies Module
