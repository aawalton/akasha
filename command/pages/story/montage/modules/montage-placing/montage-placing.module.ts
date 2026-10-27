import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const montagePlacing = {
  id: "01a17ef5-e63b-7819-9ee9-7132a15787c1",
  type: "page-type/module",
  slug: "montage-placing",
  definition: "the turn, checks, clock and chain a montage call runs on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage runs on the turn named, or else on the story's latest turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A montage starts at its turn's end, else the turn before's, else the story's opening.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn stating `interruptsAt` hands that instant to the montage.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A montage's first roll is chained from the line a settle call would chain from.",
    },
  ],
  createdAt: "2026-10-27T20:03:26.902Z",
  updatedAt: "2026-10-27T20:03:26.902Z",
} as const satisfies Module
