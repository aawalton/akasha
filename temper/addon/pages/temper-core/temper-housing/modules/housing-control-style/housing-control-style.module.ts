import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const housingControlStyle = {
  id: "01a0da26-43d4-7903-9b88-282b7b63df67",
  type: "page-type/module",
  slug: "housing-control-style",
  definition: "giving the house-travel window's fields, dropdowns and buttons the web's look",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every field, dropdown, button and slider in the window takes window-controls' look.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Controls are styled for the panel they sit on, one level above the window.",
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
} as const satisfies Module
