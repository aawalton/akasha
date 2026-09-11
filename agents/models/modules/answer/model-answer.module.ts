import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const modelAnswer = {
  id: "01a090e8-1fef-7d6a-a940-542adc23a645",
  pageTypeSlug: "module",
  type: "module",
  slug: "model-answer",
  definition: "how a yes or no answer from a model is read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An answer opening with yes is a yes.",
    },
    {
      invariantKind: "departure",
      statement: "Everything that is no letter is passed over before the opening is read.",
    },
    {
      invariantKind: "departure",
      statement: "An answer is read whatever case the answer is written in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a yes means to the caller.",
    },
  ],
} as const satisfies Module
