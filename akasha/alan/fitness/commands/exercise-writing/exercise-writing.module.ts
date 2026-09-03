import type { Module } from "@akasha/code-system/module"

export const exerciseWriting = {
  id: "01a06876-6c5f-7319-8834-2bab196e764d",
  pageTypeSlug: "module",
  slug: "exercise-writing",
  definition: "how an exercise command composes the pages it writes and lands them in one change",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page written over is composed from what it already holds and what is changed.",
    },
    {
      invariantKind: "departure",
      statement: "A page the index does not hold is composed as a new page rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page file that will not load is a refusal rather than a page written over.",
    },
    {
      invariantKind: "departure",
      statement: "Every page one call writes lands as one change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a command was told on the command line.",
    },
  ],
} as const satisfies Module
