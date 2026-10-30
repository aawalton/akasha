import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const recurrenceShape = {
  id: "01a05c6f-c7c3-732d-8113-3c8b675fd74f",
  type: "page-type/module",
  slug: "recurrence-shape",
  definition: "the values that code uses to find the next day in the recurrence of a to-do",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rule a repeating thing has may be absent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advanced due date always names a day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advanced due date names a time only where a time was already held.",
    },
  ],
  createdAt: "2026-09-01T10:07:04.643Z",
  updatedAt: "2026-10-30T16:04:40.236Z",
} as const satisfies Module
