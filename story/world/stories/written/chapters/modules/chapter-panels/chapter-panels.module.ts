import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const chapterPanels = {
  id: "01a0e9a4-dccf-7135-965e-fa2e6d11f276",
  type: "page-type/module",
  slug: "chapter-panels",
  definition: "the panels a written chapter's story names, drawn beside the chapter's prose",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is drawn with the panels its story names, as a play screen is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the panels placed aside are drawn beside a chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter at player discloses to its panels as a turn at player does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter not yet at player hands its panels no turn, cover or state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels are handed the chapter as the one turn they read, with its cover.",
    },
  ],
} as const satisfies Module
