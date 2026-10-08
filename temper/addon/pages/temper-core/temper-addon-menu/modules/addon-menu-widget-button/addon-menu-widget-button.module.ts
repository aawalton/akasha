import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetButton = {
  id: "01a06100-0000-7000-8000-000000000013",
  type: "page-type/module",
  slug: "addon-menu-widget-button",
  definition: "the clickable button widget, with an optional icon face",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dangerous button asks for confirmation before running its function.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dangerous button's warning text becomes the confirmation dialog body.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An icon button is a bare 26 by 26 texture rather than a labelled button.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
