import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const filterButton = {
  id: "01a05c69-c061-75af-a7c1-4fa64f360ba0",
  type: "page-type/module",
  slug: "filter-button",
  definition: "the button opening a filter's choices",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A filter picked from the empty menu opens its choices before any choice is made.",
    },
  ],
  createdAt: "2026-09-01T10:00:29.537Z",
  updatedAt: "2026-09-27T03:58:09.000Z",
} as const satisfies Module
