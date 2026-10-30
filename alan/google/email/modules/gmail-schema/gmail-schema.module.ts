import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gmailSchema = {
  id: "01a05c0e-372f-7384-9024-babc64ceccf2",
  type: "page-type/module",
  slug: "gmail-schema",
  definition: "the shapes Gmail responds in",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A field Gmail sends that is not asked for is kept rather than dropped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A header is matched without regard to case.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The body taken is the first plain-text part found walking the parts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message part has parts of its own.",
    },
  ],
  createdAt: "2026-09-01T08:20:30.639Z",
  updatedAt: "2026-10-30T15:13:41.146Z",
} as const satisfies Module
