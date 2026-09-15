import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAnswer = {
  id: "01a090e8-1fef-7d6a-a940-542adc23a645",
  type: "module",
  slug: "model-answer",
  definition: "how a yes or no answer from a model is read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer opening with yes is a yes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An answer whose last line is yes alone is a yes to a caller reading the last line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A caller reading the last line takes a line holding anything besides yes as no.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Everything that is no letter is passed over before the opening is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An answer is read whatever case the answer is written in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says what a yes means to the caller.",
    },
  ],
} as const satisfies Module
