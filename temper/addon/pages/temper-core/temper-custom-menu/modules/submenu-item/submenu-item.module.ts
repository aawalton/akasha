import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const submenuItem = {
  id: "01a0605a-5820-77e8-af26-680a7db72e96",
  type: "page-type/module",
  slug: "submenu-item",
  definition: "the row that opens a sub-menu when the mouse rests on it",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A row with a sub-menu shows an arrow at its right edge.",
    },
  ],
  createdAt: "2026-09-02T04:22:08.672Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
