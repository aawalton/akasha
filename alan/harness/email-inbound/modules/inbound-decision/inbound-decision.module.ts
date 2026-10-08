import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inboundDecision = {
  id: "01a05bcd-25e4-7b6c-9b1e-0ebb793da0e0",
  type: "page-type/module",
  slug: "inbound-decision",
  definition: "what becomes of an arriving email",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A message on a persona channel from anyone but the watched account is discarded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A message on no persona channel is surfaced.",
    },
  ],
  createdAt: "2026-09-01T07:09:26.372Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies Module
