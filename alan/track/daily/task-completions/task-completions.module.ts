import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const taskCompletions = {
  id: "01a06972-bbf5-7000-bf44-04b8b1fd776a",
  pageTypeSlug: "module",
  type: "module",
  slug: "task-completions",
  definition: "what a day's health task points come to, from the to-dos finished inside its window",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A day's window opens when Alan's sleep opened it and closes when the next day did.",
    },
    {
      invariantKind: "departure",
      statement: "A day whose window refuses answers no points at all rather than zero points.",
    },
    {
      invariantKind: "departure",
      statement:
        "A day answering no points is named on the error stream with why its window refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts a day over the six-in-the-morning ESO boundary.",
    },
  ],
} as const satisfies Module
