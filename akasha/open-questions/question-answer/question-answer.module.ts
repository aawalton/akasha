import type { Module } from "@akasha/code-system/module"

export const questionAnswer = {
  id: "01a05c99-9dab-7732-8539-f2be455c92df",
  pageTypeSlug: "module",
  slug: "question-answer",
  definition: "what an answer to a question is written under, and which option was tapped",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tap is trusted only where the option it names still reads as it did.",
    },
    {
      invariantKind: "departure",
      statement: "An index outside the options names no option.",
    },
    {
      invariantKind: "departure",
      statement: "An answer typed rather than tapped names no option.",
    },
  ],
} as const satisfies Module
