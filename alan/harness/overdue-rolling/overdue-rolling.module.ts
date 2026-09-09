import type { Module } from "@akasha/code/module"

export const overdueRolling = {
  id: "01a0795a-2cb4-7d47-b7d6-2b120f641fd4",
  pageTypeSlug: "module",
  type: "module",
  slug: "overdue-rolling",
  definition: "an overdue task moved onto the day now open",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A task due before the day now open comes due on that day.",
    },
    {
      invariantKind: "departure",
      statement: "The day now open is counted from six in the morning in New York.",
    },
    {
      invariantKind: "departure",
      statement: "A task stating no due date is not moved.",
    },
    {
      invariantKind: "departure",
      statement: "A task already marked done is not moved.",
    },
    {
      invariantKind: "departure",
      statement: "The key saying a task is done is read from the page type moved.",
    },
    {
      invariantKind: "departure",
      statement: "A recurring task is moved as a task happening once is.",
    },
    {
      invariantKind: "departure",
      statement: "The tasks of one page type are moved in one commit.",
    },
    {
      invariantKind: "departure",
      statement:
        "The moving is done by a workstation timer rather than by a browser opening a list.",
    },
    {
      invariantKind: "absence",
      statement: "A page type whose due date moves on completion alone is moved nowhere here.",
    },
  ],
} as const satisfies Module
