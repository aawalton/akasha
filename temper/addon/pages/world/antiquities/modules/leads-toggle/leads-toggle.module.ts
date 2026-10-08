import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const leadsToggle = {
  id: "01a06274-b08a-7259-9ab9-8679894dbe99",
  type: "page-type/module",
  slug: "leads-toggle",
  definition: "the sweep over every antiquity that fills the list, and the window's showing",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs only while the window is hidden and about to be shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The zone and set menus are filled from the first sweep alone.",
    },
  ],
  createdAt: "2026-09-02T14:10:09.674Z",
  updatedAt: "2026-09-22T02:33:54.000Z",
} as const satisfies Module
