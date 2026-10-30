import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchSyncing = {
  id: "01a0686a-7a57-7488-a53f-a41a698c4316",
  type: "page-type/module",
  slug: "monarch-syncing",
  definition: "how a service writes every Monarch record into akasha",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every account and category and tag and merchant and holding and transaction lands on a full run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Our copy is reported against Monarch's own totals once the landing is done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The category rules are run over the rows that arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The full pass repairs the rows the minutely poll left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run told to be incremental lands the trusted window rather than the whole of Monarch.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A failing account is caught and named rather than stopping the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every account is tried before the run ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run in which any account failed ends non-zero.",
    },
  ],
  createdAt: "2026-09-03T17:56:43.735Z",
  updatedAt: "2026-10-30T15:42:04.454Z",
} as const satisfies Module
