import type { Module } from "@akasha/code-system/module"

export const answerAsk = {
  id: "01a0640f-8510-7705-b1ef-543766ffde5e",
  pageTypeSlug: "module",
  slug: "answer-ask",
  definition: "a question asked in a browser carried to the page store and answered back",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader who is not signed in is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A question is carried as a JSON body.",
    },
    {
      invariantKind: "departure",
      statement: "What the store answered is carried back unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "The caller reads the store's own shape.",
    },
  ],
} as const satisfies Module
