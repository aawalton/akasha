import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedQuiet = {
  id: "01a14b1d-7e51-7a5c-8bfe-b6bede2f9b2b",
  type: "page-type/module",
  slug: "played-quiet",
  definition: "how long the turn being made has gone with no seat of its story working",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A step's quiet is timed from reaching the step or from its last working seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn a seat is working has no quiet.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The quiet is read again every fifteen seconds while a turn is being made.",
    },
  ],
  createdAt: "2026-10-17T18:26:26.512Z",
  updatedAt: "2026-10-17T18:26:26.512Z",
} as const satisfies Module
