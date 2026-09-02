import type { Module } from "@akasha/code-system/module"

export const orderListBoxMoveButtons = {
  id: "01a06207-bdf5-7fd4-8f0f-16aa4a732fd7",
  pageTypeSlug: "module",
  slug: "order-list-box-move-buttons",
  definition: "the four buttons moving the picked row up, down, to the top or to the foot",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A move button is disabled where the picked row cannot go that way.",
    },
    {
      invariantKind: "departure",
      statement: "The four buttons sit beside the scroll list rather than on a row.",
    },
  ],
} as const satisfies Module
