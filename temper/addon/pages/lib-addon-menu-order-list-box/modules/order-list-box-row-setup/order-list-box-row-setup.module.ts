import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orderListBoxRowSetup = {
  id: "01a06207-bdf7-755b-88bf-b9588192e64b",
  type: "page-type/module",
  slug: "order-list-box-row-setup",
  definition: "the row template and the reads of what a caller asked the widget to show",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row takes the height and the font the caller states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A disabled list takes no drag and no button press.",
    },
  ],
} as const satisfies Module
