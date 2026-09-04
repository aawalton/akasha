import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseSaid = {
  id: "01a0685c-7d81-763b-80e8-9562beedacd6",
  pageTypeSlug: "module",
  slug: "exercise-said",
  definition: "reading the words a caller handed one of the training commands",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A word this does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A flag named twice is refused rather than settled by the last one said.",
    },
    {
      invariantKind: "departure",
      statement: "Each prose flag has a twin reading the same value off a file.",
    },
    {
      invariantKind: "departure",
      statement: "A call saying both a prose flag and its twin is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
