import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const exerciseChoosing = {
  id: "01a0685c-7d81-7647-9788-b3b00aea6593",
  pageTypeSlug: "module",
  slug: "exercise-choosing",
  definition: "turning what a caller said into a value the fitness vocabulary holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value is said as its label or as its dashed id, and either is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A value is compared with its case set aside.",
    },
    {
      invariantKind: "departure",
      statement: "A value the vocabulary does not hold is refused with the whole vocabulary named.",
    },
    {
      invariantKind: "departure",
      statement: "A list said twice over holds the repeated value once.",
    },
    {
      invariantKind: "departure",
      statement: "An empty place in a comma-separated list is passed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here throws.",
    },
  ],
} as const satisfies Module
