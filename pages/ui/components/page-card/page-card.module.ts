import type { Module } from "@akasha/code/module"

export const pageCard = {
  id: "01a06257-46e9-7c06-a8f0-6a18df5082fb",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-card",
  definition: "a page shown as a card with its icon, title, cover and properties",
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
  ],
} as const satisfies Module
