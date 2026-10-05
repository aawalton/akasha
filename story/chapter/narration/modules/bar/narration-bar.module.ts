import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationBar = {
  id: "01a10dd0-f139-7d79-b4dd-3b0687bae198",
  type: "page-type/module",
  slug: "narration-bar",
  definition: "the bar at the foot of the app that shows and steers the narration playing",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar sits above the bottom navigation where the app shows one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failed narration shows its reason in the bar with a way to try again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bar scrubs only through the audio made so far.",
    },
  ],
} as const satisfies Module
