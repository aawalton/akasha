import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const retrofitSystemCards = {
  id: "01a05bc6-fa4a-7010-bbf2-e17c6943aef4",
  pageTypeSlug: "module",
  slug: "retrofit-system-cards",
  definition: "the system cards in a chapter cut back to the progression each one announces",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A soul appraisal card is left exactly as the card was written.",
    },
    {
      invariantKind: "departure",
      statement:
        "What has been announced is remembered across the whole text rather than within one card.",
    },
    {
      invariantKind: "departure",
      statement: "The announcements of one card are ordered by kind before their own order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A card that stands is headed as the tower rather than by what the card said before.",
    },
  ],
} as const satisfies Module
