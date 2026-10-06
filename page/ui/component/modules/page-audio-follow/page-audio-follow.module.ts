import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pageAudioFollow = {
  id: "01a111d0-25ba-77a4-8981-f3f25b639561",
  type: "page-type/module",
  slug: "page-audio-follow",
  definition: "a page's text following the sentence being read aloud from it",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Only the page being read aloud marks a sentence, and every other page marks none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The sentence is marked by a highlight over the drawn text rather than by a new element.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "So every way of drawing prose is followed alike, with no drawing of its own changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page scrolls only when the sentence leaves the middle of the screen.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A wheel, a swipe or a scrolling key stops the page following, and a button resumes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "While a page is read aloud, its scroll writes no read progress and marks it read never.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sentence a long page has not drawn yet is reached by scrolling to its share of the page.",
    },
  ],
} as const satisfies Module
