import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudLayoutPlace = {
  id: "01a17ec2-70c2-768d-9d81-aa9985ae345e",
  type: "page-type/module",
  slug: "hud-layout-place",
  definition: "where each HUD panel sits, stacked away from the edge of its dock",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dock's panels stack away from its edge in display order, one gap apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dock's first panel sits one gap from the screen's edge.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hidden panel takes no room and leaves no gap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel that never moves stays where it is, and its dock stacks on from it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A dock in the middle of an edge is centred, kept clear of that edge's corners.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where an edge is too short, panels that shrink give up room, lowest first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel that does not shrink keeps its own height whatever the room.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel is held by the point of the screen nearest its dock.",
    },
  ],
  createdAt: "2026-10-27T19:07:14.498Z",
  updatedAt: "2026-10-27T19:07:14.498Z",
} as const satisfies Module
