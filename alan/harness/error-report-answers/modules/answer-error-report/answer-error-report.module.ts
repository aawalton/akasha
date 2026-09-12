import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const answerErrorReport = {
  id: "01a08e53-e866-7aa9-87b1-bfd7879250ca",
  type: "module",
  slug: "answer-error-report",
  definition: "the answer a site gives a browser reporting one error",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A site naming no shell origin is answered with no cross-origin headers.",
    },
    {
      invariantKind: "departure",
      statement: "A report is filed only once the shape it must have has taken it.",
    },
    {
      invariantKind: "departure",
      statement: "A filing that throws is answered rather than left to the router.",
    },
  ],
} as const satisfies Module
