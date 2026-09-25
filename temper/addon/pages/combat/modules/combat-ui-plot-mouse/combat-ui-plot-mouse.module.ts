import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const combatUiPlotMouse = {
  id: "01a0617f-585a-782b-8e49-5df97e36f149",
  type: "page-type/module",
  slug: "combat-ui-plot-mouse",
  definition: "dragging, hovering and labelling on the graph",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What the graph holds under the pointer is shown in Temper's popover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each series under the pointer is a line in that series' own color.",
    },
  ],
} as const satisfies Module
