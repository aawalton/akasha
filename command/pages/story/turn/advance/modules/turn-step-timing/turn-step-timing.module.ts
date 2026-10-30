import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnStepTiming = {
  id: "01a18cd8-a5b0-785c-ab83-739b83feae6a",
  type: "page-type/module",
  slug: "turn-step-timing",
  definition: "the checklist step and beat a one-seat turn's advance names to its phase timings",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance of a one-seat turn names the checklist step it hands in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance of a seat-graph turn names no step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step is named as `turn-step-naming` names it, as its checklist item is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Lore, beats, prose and a review are named for what is handed in, a review with its reviewer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats handed in from one beat on restate that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "At beats, a record is the numbers, the memory or the pictures of its beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Off the beats, a record is named for its recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step's beat is the beat the advance names, or else the one beat everything it hands in names.",
    },
  ],
  createdAt: "2026-10-30T12:46:10.864Z",
  updatedAt: "2026-10-30T13:21:51.721Z",
} as const satisfies Module
