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
      statement: "A turn's cover is carried with its number for every turn given, drawn or not.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn stating no cover carries none, and a turn stating no position is numbered by its place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn not yet at player is kept from the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating no status is read as at player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The latest turn not yet at player is the turn being made.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The in-game time said is the end time the latest turn at player states, or none if it states none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The appointments listed are those after that end time, soonest first.",
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
