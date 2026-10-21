import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readingStatCase = {
  id: "01a15c21-2df0-780a-bd99-915c26b8edc2",
  type: "page-type/module",
  slug: "reading-stat-case",
  definition: "the stat case pinned from a reading, where one was",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is a reading's where it names that reading's character, bar and second.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A case is named by its page's slug.",
    },
  ],
  createdAt: "2026-10-21T01:44:00.751Z",
  updatedAt: "2026-10-21T01:44:00.751Z",
} as const satisfies Module
