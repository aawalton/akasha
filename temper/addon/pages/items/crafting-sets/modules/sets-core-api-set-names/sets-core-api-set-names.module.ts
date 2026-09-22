import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsCoreApiSetNames = {
  id: "01a06231-8f1d-7810-a653-0c0cdf32ad4b",
  type: "page-type/module",
  slug: "sets-core-api-set-names",
  definition: "a set's name in a language, in every language, or every set's names at once",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "Every set's names are built once and held for the rest of the session.",
    },
  ],
} as const satisfies Module
