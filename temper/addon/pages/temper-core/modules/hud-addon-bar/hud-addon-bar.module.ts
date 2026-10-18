import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudAddonBar = {
  id: "01a061c5-18dd-7007-b0fb-76457ff3f070",
  type: "page-type/module",
  slug: "hud-addon-bar",
  definition: "the strip across the top of the screen drawing the registered fields",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar is built once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every field is redrawn on a fixed interval.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A field registered before the bar is built is drawn once the bar is built.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell stating no color is drawn in the muted text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell is set as a shadowed number, since every field the bar has is a figure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cell is right-aligned in the room `hud-addon-layout` gives that cell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The bar lays its cells out again on every redraw, as a cell's text changes width.",
    },
  ],
  createdAt: "2026-09-02T10:58:22.045Z",
  updatedAt: "2026-10-18T17:34:18.543Z",
} as const satisfies Module
