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
      statement:
        "Lore, beats, prose and a review are named for what is handed in, a review with its reviewer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats handed in from one beat on are the event restated at that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A mechanics recorder's record is the changes, and another recorder's is its memory or its pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A record holding none of those is named for its recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A step's beat is the beat the advance names, or else the one beat everything it hands in names.",
    },
  ],
  createdAt: "2026-10-30T12:46:10.864Z",
  updatedAt: "2026-10-30T12:46:10.864Z",
} as const satisfies Module
