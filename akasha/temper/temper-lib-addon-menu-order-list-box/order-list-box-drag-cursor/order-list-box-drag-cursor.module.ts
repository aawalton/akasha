import type { Module } from "@akasha/code-system/module"

export const orderListBoxDragCursor = {
  id: "01a06207-bdf1-7c7e-8938-7ce03c0df707",
  pageTypeSlug: "module",
  slug: "order-list-box-drag-cursor",
  definition: "the floating label following the pointer and the handlers a drag switches on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dragged row is shown as a label anchored to the pointer.",
    },
    {
      invariantKind: "departure",
      statement: "A drag ending anywhere off the list puts the row back.",
    },
  ],
} as const satisfies Module
