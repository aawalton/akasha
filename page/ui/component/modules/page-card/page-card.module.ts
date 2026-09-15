import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageCard = {
  id: "01a06257-46e9-7c06-a8f0-6a18df5082fb",
  type: "module",
  slug: "page-card",
  definition: "the card one page is shown as, drawn by that page's own page type",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A card whose page type has a completion draws a circle where its icon goes.",
    },
    {
      invariantKind: "departure",
      statement:
        "The keys the circle reads and writes come from the page type rather than the card.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no completion draws its icon and no circle.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page type above it draws takes the card beside page.",
    },
  ],
} as const satisfies Module
