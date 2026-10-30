import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scheduling = {
  id: "01a05c6f-c7c4-7bd2-ac26-fc8ae8b38e8b",
  type: "page-type/module",
  slug: "scheduling",
  definition: "how code finds the next day in the recurrence of a to-do",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing with no rule never advances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next occurrence falls after the end of the logical day the reset time names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A thing with no due date yet is anchored at the reset time rather than at the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the day moves when a recurrence advances.",
    },
  ],
  createdAt: "2026-09-01T10:07:04.644Z",
  updatedAt: "2026-10-30T16:04:16.897Z",
} as const satisfies Module
