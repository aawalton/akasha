import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedRows = {
  id: "01a0a15f-4c11-7a20-9e33-2b6f0d41c7a5",
  type: "page-type/module",
  slug: "played-rows",
  definition: "the turns and chapters a story was played in, shaped into what a display draws",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating no position sorts after every turn that states one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn with no title of its own is named by the position that turn states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn carries the prose handed here and no prose where none was handed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The turns drawn are the last twenty, and the rest are counted rather than drawn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No action box is drawn here, so a game declaring one has that panel left out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story no game names draws its prose and no panel beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story draws its own prose whether or not its game declares that panel.",
    },
  ],
} as const satisfies Module
