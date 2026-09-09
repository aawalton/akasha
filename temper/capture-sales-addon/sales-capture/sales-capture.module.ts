import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const salesCapture = {
  id: "01a060e2-3181-7087-9742-dc3d075f9c3c",
  pageTypeSlug: "module",
  slug: "sales-capture",
  definition: "the player's own guild store sales, read off the guild history event stream",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A sale is recorded only where the seller is the player.",
    },
    {
      invariantKind: "departure",
      statement: "A sale is keyed by the guild history event id of that sale.",
    },
    {
      invariantKind: "departure",
      statement: "Sales are read from the trader category of every guild the player belongs to.",
    },
    {
      invariantKind: "constraint",
      statement: "The event stream is reached through LibHistoire.",
    },
  ],
} as const satisfies Module
