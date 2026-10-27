import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const actionBarMessage = {
  id: "01a05b71-e542-79f6-8369-4b9b67355af8",
  type: "page-type/module",
  slug: "action-bar-message",
  definition: "the names a player's lines are sent to a game under",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/stopgap",
      statement: "The action bar is played by Alan alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chat sends under a name of its own, made from his.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The action bar has no name to send under, since it sends no message.",
    },
  ],
  createdAt: "2026-09-01T05:29:46.050Z",
  updatedAt: "2026-10-27T22:10:37.219Z",
} as const satisfies Module
