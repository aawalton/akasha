import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchAgree = {
  id: "01a06867-e5ed-703d-b129-e891c8fed291",
  type: "page-type/module",
  slug: "monarch-agree",
  definition:
    "how code finds whether the paths the category rules take match over the Monarch transactions",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bucketed index and a full scan are claimed to give one neighbourhood.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That claim covers every pairing subject the standing rules reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Proposing from history in memory and applying from a database window are claimed to decide alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every claim is said as that claim is weighed rather than only at the end.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run where any claim fails leaves non-zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Rows a rule with no counterpart clause reaches are counted and not weighed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A claim that settles the same way every run stands as the module's test rather than here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Every read runs read-only.",
    },
  ],
  createdAt: "2026-09-03T17:53:54.669Z",
  updatedAt: "2026-10-30T15:41:35.125Z",
} as const satisfies Module
