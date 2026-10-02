import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inlineCover = {
  id: "01a0fda5-e07b-7d50-aaa7-880c4bc48733",
  type: "page-type/module",
  slug: "inline-cover",
  definition: "a turn's cover drawn in its prose, after the paragraph it shows",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's cover is drawn in the prose rather than in a panel beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover is drawn right after the paragraph its stated words open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Words are matched ignoring case, emphasis marks and punctuation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Covers are matched in order, each looked for from the paragraph the last took.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cover stating no words, or words opening no paragraph, is drawn after the last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cover's box is set before it loads, so the prose under it never moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The box is portrait, as every picture is now drawn, and an older one sits inside.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The box is sized by the column and a fixed widest width, never by the viewport.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Clicking a cover opens it whole, fitted to the window, over the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A cover in a game being played carries the button asking for it to be drawn again.",
    },
  ],
} as const satisfies Module
