import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleVocabulary = {
  id: "01a0657b-9adc-7006-86fa-63e79d35b6a6",
  type: "module",
  slug: "rule-vocabulary",
  definition: "a vocabulary of values with the patterns naming them, and the value a text reads as",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A text matching no pattern reads as `unrecognized`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The longest matching pattern wins.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two matching patterns of one length are settled by which sorts first.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Where two values claim one pattern, the value listed first wins and nothing reports it.",
    },
  ],
} as const satisfies Module
