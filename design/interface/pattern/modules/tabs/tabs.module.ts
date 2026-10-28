import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tabs = {
  id: "01a05c69-c065-7518-bd4e-8981ac29bd31",
  type: "page-type/module",
  slug: "tabs",
  definition: "the tabs dividing a page or a menu",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Tabs are drawn as pills on a raised track, or as words underlined when chosen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An underlined tab is marked chosen by an accent bar under its word.",
    },
  ],
  createdAt: "2026-09-01T10:00:29.541Z",
  updatedAt: "2026-10-28T19:04:40.030Z",
} as const satisfies Module
