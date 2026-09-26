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
      decisionKind: "decision-kind/departure",
      statement:
        "Every section a panel reads is composed, and the panels named settle what is drawn.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No beat log and no action box are composed here, since no panel draws either.",
    },
  ],
} as const satisfies Module
