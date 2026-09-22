import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskProgressResolver = {
  id: "01a062ee-f0bd-7071-8b01-5c61376d23f5",
  type: "page-type/module",
  slug: "characters-task-progress-resolver",
  definition: "how far a task has got, worked out from the completion card that task names",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Which resolver a completion card is answered by is stated in one place.",
    },
  ],
} as const satisfies Module
