import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const ruleVocabulary = {
  id: "01a0657b-9adc-7006-86fa-63e79d35b6a6",
  type: "page-type/module",
  slug: "rule-vocabulary",
  definition: "how code chooses the value that matches a text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A text matching no pattern reads as `unrecognized`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The longest matching pattern wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two matching patterns of one length are settled by which sorts first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where two values claim one pattern, the value listed first wins and nothing reports it.",
    },
  ],
  createdAt: "2026-09-03T04:16:34.524Z",
  updatedAt: "2026-10-30T16:09:15.743Z",
} as const satisfies Module
