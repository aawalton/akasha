import type { Module } from "@akasha/code-system/module"

export const questionStatus = {
  id: "01a05c99-9da9-7a66-b674-ff85dda291fd",
  pageTypeSlug: "module",
  slug: "question-status",
  definition: "the status a question stands in, and which of them is still waiting",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only an open question is still waiting on Alan.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store.",
    },
  ],
} as const satisfies Module
