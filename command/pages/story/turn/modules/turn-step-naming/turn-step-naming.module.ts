import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnStepNaming = {
  id: "01a18cf9-5069-7272-b5ea-6e90fd503155",
  type: "page-type/module",
  slug: "turn-step-naming",
  definition: "the name of each step of a one-seat turn",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checklist item and the phase timing row of its hand-in name its step alike.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The steps are lore, beats, restate, numbers, prose, memory, pictures, a review and a record.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A review is named with its reviewer, and a record with its recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a seat on a step is doing is said here from that step's name.",
    },
  ],
  createdAt: "2026-10-30T13:21:51.721Z",
  updatedAt: "2026-10-30T18:22:18.325Z",
} as const satisfies Module
