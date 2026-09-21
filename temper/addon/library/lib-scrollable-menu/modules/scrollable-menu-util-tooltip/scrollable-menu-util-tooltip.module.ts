import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilTooltip = {
  id: "01a06275-c44a-7df7-b767-4561076aeb19",
  type: "page-type/module",
  slug: "scrollable-menu-util-tooltip",
  definition: "the placement and display of the tooltip for a menu entry",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A custom tooltip function replaces the game tooltip entirely.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The tooltip flips side when its text would overflow the screen edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Hovering an entry without a submenu hides any visible submenu first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The selected-entry sound is silenced by swapping the game sound table entry.",
    },
  ],
} as const satisfies Module
