import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const rrule = {
  id: "01a05b92-a9c7-7c22-ad4e-59ec5c9f90ec",
  type: "page-type/module",
  slug: "rrule",
  definition: "the operations a recurrence rule property supports",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value is a rule alone or a rule beside what that rule counts from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value whose rule would read as its text rather than as words is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a rule reads as words is asked of the wording rather than judged here.",
    },
  ],
} as const satisfies Module
