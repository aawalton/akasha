import type { Module } from "../../code-system/modules/module.page-type.ts"

export const ruleVocabulary = {
  id: "01a0657b-9adc-7006-86fa-63e79d35b6a6",
  pageTypeSlug: "module",
  slug: "rule-vocabulary",
  definition: "a vocabulary of values with the patterns naming them, and the value a text reads as",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A text matching no pattern reads as `unrecognized`.",
    },
    {
      invariantKind: "departure",
      statement: "The longest matching pattern wins.",
    },
    {
      invariantKind: "departure",
      statement: "Two matching patterns of one length are settled by which sorts first.",
    },
  ],
} as const satisfies Module
