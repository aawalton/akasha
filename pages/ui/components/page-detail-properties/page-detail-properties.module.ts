import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const pageDetailProperties = {
  id: "01a06257-46ed-7cf6-b31e-9adb50ca83bc",
  type: "module",
  slug: "page-detail-properties",
  definition: "the property rows shown down the side of one page",
  code: "tsx",
  invariants: [
    { invariantKind: "departure", statement: "The rows are drawn in the order their titles read." },
    {
      invariantKind: "departure",
      statement: "The order a page type declares its properties in is not read here.",
    },
    { invariantKind: "absence", statement: "No row here is dragged into an order of its own." },
  ],
} as const satisfies Module
