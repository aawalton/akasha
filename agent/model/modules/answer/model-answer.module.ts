import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelAnswer = {
  id: "01a090e8-1fef-7d6a-a940-542adc23a645",
  type: "page-type/module",
  slug: "model-answer",
  definition: "how code reads a yes from a model",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer opening with yes is a yes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An answer whose last line is yes alone is a yes to a caller reading the last line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller reading the last line takes a line holding anything besides yes as no.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Everything that is no letter is passed over before the opening is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An answer is read whatever case the answer is written in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a yes means to the caller.",
    },
  ],
  createdAt: "2026-09-11T14:38:46.767Z",
  updatedAt: "2026-10-19T19:24:01.996Z",
} as const satisfies Module
