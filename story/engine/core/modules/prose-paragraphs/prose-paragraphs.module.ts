import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseParagraphs = {
  id: "01a17f35-e944-752c-9f65-a9b0695ebe62",
  type: "page-type/module",
  slug: "prose-paragraphs",
  definition: "the paragraphs a run of prose is drawn as, and how many",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A paragraph is parted from the next by one blank line or more.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window block is drawn as a card, so it counts as no paragraph.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whatever counts a paragraph to draw something there counts it here.",
    },
  ],
  createdAt: "2026-10-27T21:13:21.988Z",
  updatedAt: "2026-10-27T21:13:21.988Z",
} as const satisfies Module
