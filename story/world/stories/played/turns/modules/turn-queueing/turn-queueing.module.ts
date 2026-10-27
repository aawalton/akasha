import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnQueueing = {
  id: "01a17f97-e01f-7558-b225-10534883a0ff",
  type: "page-type/module",
  slug: "turn-queueing",
  definition: "whether a played turn holds back the turn made after it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at beats holds back the next turn until every beat has its memory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at world-builder or game-master holds back the next turn as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "So the player may send an action while a turn is at any of those steps.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A roleplayed turn holds back no turn, since it never flows by beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn at any other step holds back no turn.",
    },
  ],
  createdAt: "2026-10-27T23:00:22.175Z",
  updatedAt: "2026-10-27T23:00:22.175Z",
} as const satisfies Module
