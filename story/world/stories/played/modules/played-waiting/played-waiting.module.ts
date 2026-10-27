import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedWaiting = {
  id: "01a17f9c-9405-7ec3-82e7-cb96525fa0fd",
  type: "page-type/module",
  slug: "played-waiting",
  definition: "whether the turn being made waits for the turn before it, and what is said of it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The latest turn waits at world-builder behind a turn at beats, world-builder or game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A waiting turn is said to wait for the turn before, rather than to be worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn never waits, since a roleplayed story never flows by beats.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The rows hold no beats, so a turn behind one whose memory is in reads as waiting until it is told.",
    },
  ],
  createdAt: "2026-10-27T23:05:30.373Z",
  updatedAt: "2026-10-27T23:05:30.373Z",
} as const satisfies Module
