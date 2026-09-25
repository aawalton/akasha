import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deckPageContent = {
  id: "01a06558-c2cc-7006-bcf3-be6cf274a568",
  type: "page-type/module",
  slug: "deck-page-content",
  definition: "a deck as a browser draws it and as a reader steps through it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A slide is laid out by its kind, from the slide pages its deck has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A point naming a fill is drawn as a bar, and one naming none as a light.",
    },
  ],
} as const satisfies Module
