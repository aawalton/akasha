import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const completionInputSchema = {
  id: "01a060d7-c8ce-7583-8247-676a8ee7d0c5",
  type: "page-type/module",
  slug: "completion-input-schema",
  definition:
    "a tolerant reading of what the addon wrote for an account or a character or a companion",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field that will not parse falls away rather than failing the record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record the reading rejects whole comes back as the record went in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the reading does not name is kept.",
    },
  ],
  createdAt: "2026-09-02T06:39:09.518Z",
  updatedAt: "2026-09-24T23:13:46.000Z",
} as const satisfies Module
