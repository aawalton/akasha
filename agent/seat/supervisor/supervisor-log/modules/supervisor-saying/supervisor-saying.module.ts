import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorSaying = {
  id: "01a0a170-307b-76c6-967a-d03906eaf880",
  type: "page-type/module",
  slug: "supervisor-saying",
  definition: "a line a supervisor says where the console will not take it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line the console throws over is written to standard error instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line standard error throws over is dropped rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every line a saying says carries the mark that saying was made with.",
    },
  ],
} as const satisfies Module
