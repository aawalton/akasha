import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const modelVersionNaming = {
  id: "01a0d4b9-5e46-7619-a287-8ee15cf54a61",
  type: "page-type/module",
  slug: "model-version-naming",
  definition: "the model version an id names, and the id and title a model version states",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A model version is found by the id its page states rather than by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id no model version states names no model version.",
    },
  ],
} as const satisfies Module
