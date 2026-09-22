import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const salesCapture = {
  id: "01a060e2-3181-7087-9742-dc3d075f9c3c",
  type: "page-type/module",
  slug: "sales-capture",
  definition: "the player's own guild store sales, read off the guild history event stream",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale is recorded only where the seller is the player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sale is keyed by the guild history event id of that sale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Sales are read from the trader category of every guild the player belongs to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The event stream is reached through the guild history modules this add-on carries.",
    },
  ],
} as const satisfies Module
