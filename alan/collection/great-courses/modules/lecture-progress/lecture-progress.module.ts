import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const lectureProgress = {
  id: "01a15000-e667-769d-bcb3-6bca5f9587c4",
  type: "page-type/module",
  slug: "lecture-progress",
  definition: "how far through its lectures a course's page counts Alan",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A course's progress is the lectures watched in order, each counted whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture partly played adds nothing to a course's progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A lecture finished counts every lecture before it as watched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next lecture is the first lecture past a course's progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course's length is the sum of the lengths of its lectures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lengths and progress are counted in minutes to the hundredth.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A course also counts its lectures and how many of them are watched.",
    },
  ],
  createdAt: "2026-10-18T17:13:18.694Z",
  updatedAt: "2026-10-19T17:30:14.294Z",
} as const satisfies Module
