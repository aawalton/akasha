import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actingAccount = {
  id: "01a05b6f-999c-79d6-962f-62b580eda479",
  type: "page-type/module",
  slug: "acting-account",
  definition: "which account a seat is acting for, read back off the surface the channel wrote",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the text after the last channel footer is trusted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sender quoting the footer cannot reach past the footer the channel wrote.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The account is answered in lower case.",
    },
  ],
  createdAt: "2026-09-01T05:27:15.612Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
