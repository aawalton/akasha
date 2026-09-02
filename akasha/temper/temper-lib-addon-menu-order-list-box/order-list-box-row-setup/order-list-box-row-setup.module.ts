import type { Module } from "@akasha/code-system/module"

export const orderListBoxRowSetup = {
  id: "01a06207-bdf7-755b-88bf-b9588192e64b",
  pageTypeSlug: "module",
  slug: "order-list-box-row-setup",
  definition: "the row template and the reads of what a caller asked the widget to show",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A row takes the height and the font the caller states.",
    },
    {
      invariantKind: "departure",
      statement: "A disabled list takes no drag and no button press.",
    },
  ],
} as const satisfies Module
