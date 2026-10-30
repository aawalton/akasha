import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const overdueRolling = {
  id: "01a0795a-2cb4-7d47-b7d6-2b120f641fd4",
  type: "page-type/module",
  slug: "overdue-rolling",
  definition: "how code moves an unfinished to-do from a day before today to today",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A task due before the day now open comes due on that day.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day now open is counted from six in the morning in New York.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task stating no due date is not moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A task already marked done is not moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The key saying a task is done is read from the page type moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recurring task is moved as a task happening once is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tasks of one page type are moved in one commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The moving is done by a workstation timer rather than by a browser opening a list.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page type whose due date moves on completion alone is moved nowhere here.",
    },
  ],
  createdAt: "2026-09-07T00:52:27.956Z",
  updatedAt: "2026-10-30T15:33:45.422Z",
} as const satisfies Module
