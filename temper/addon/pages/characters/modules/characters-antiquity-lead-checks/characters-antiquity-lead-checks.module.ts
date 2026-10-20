import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersAntiquityLeadChecks = {
  id: "01a062ed-39a0-700a-b328-1ae517d89942",
  type: "page-type/module",
  slug: "characters-antiquity-lead-checks",
  definition: "the antiquities a character has left to dig, held or easy to get a lead for",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A lead is a motif lead where the antiquity's name opens with the style's word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A lead is left to dig where it is a motif lead, a legendary lead or a lead with lore unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An antiquity with no lead held is left to dig where its lore is unread and its lead is easy to get.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a lead is easy to get is read from the lead window's add-on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No antiquity is easy to get a lead for while that add-on is not loaded.",
    },
  ],
  createdAt: "2026-09-02T16:21:49.088Z",
  updatedAt: "2026-10-20T18:28:43.814Z",
} as const satisfies Module
