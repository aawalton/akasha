import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseVocabulary = {
  id: "01a0658f-e6c3-7000-8fe8-3fdbd0063b02",
  pageTypeSlug: "module",
  slug: "exercise-vocabulary",
  definition: "the values a field of an exercise page, a schedule or a constraint may carry",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A schedule day takes a focus or takes rest.",
    },
    {
      invariantKind: "departure",
      statement: "A coaching constraint takes a focus or takes all of them.",
    },
    {
      invariantKind: "departure",
      statement: "A set logged is strength, cardio or mobility.",
    },
    {
      invariantKind: "gap",
      statement: "Every list here is also the values of a select property under fitness.",
    },
    {
      invariantKind: "gap",
      statement: "A value of several words is spelled with spaces here and with dashes there.",
    },
  ],
} as const satisfies Module
