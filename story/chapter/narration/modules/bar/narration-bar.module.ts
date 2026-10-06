import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationBar = {
  id: "01a10dd0-f139-7d79-b4dd-3b0687bae198",
  type: "page-type/module",
  slug: "narration-bar",
  definition: "the bar that shows and steers the narration playing",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar sits at the top of the app, below the phone's status bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "While the bar shows, the app's top inset is the bar's height, so no header hides under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar starts where the sidebar ends, as the page does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed narration shows its reason in the bar with a way to try again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar scrubs only through the audio the player can reach so far.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Chrome reaches no part of a stream with no end, so the bar there scrubs nowhere.",
    },
  ],
} as const satisfies Module
