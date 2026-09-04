import type { Module } from "../../code-system/modules/module.page-type.ts"

export const inboundDecision = {
  id: "01a05bcd-25e4-7b6c-9b1e-0ebb793da0e0",
  pageTypeSlug: "module",
  slug: "inbound-decision",
  definition: "what becomes of an arriving email",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A message on a persona channel from anyone but the watched account is discarded.",
    },
    {
      invariantKind: "departure",
      statement: "A message on no persona channel is surfaced.",
    },
  ],
} as const satisfies Module
