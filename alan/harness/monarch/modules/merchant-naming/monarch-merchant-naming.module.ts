import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchMerchantNaming = {
  id: "01a06863-264d-729e-aab5-0dd77d14abc2",
  type: "page-type/module",
  slug: "monarch-merchant-naming",
  definition: "how code finds the Monarch merchant of a Monarch transaction",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The vocabulary is one page per merchant rather than one body under a heading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A merchant's value is the page's title and its patterns are the runs of the bank's words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Both the value and the patterns are lowered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The merchant and the statement line are read together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Either the merchant or the statement line names the merchant.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The longest matching pattern wins.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page missing a title or its patterns is passed over rather than refusing the whole vocabulary.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The vocabulary is read once and held.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A page changed under a running process is not seen.",
    },
  ],
  createdAt: "2026-09-03T17:48:43.469Z",
  updatedAt: "2026-10-30T15:41:28.129Z",
} as const satisfies Module
