import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const beatRecords = {
  id: "01a102f7-cdc1-7a2e-ad0d-b17db0f75161",
  type: "page-type/module",
  slug: "beat-records",
  definition: "a turn's beats file read into each step's part of its beats, and written back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One line is one beat, in order, naming its number and its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's time, place and who is there sit on its line beside its event.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's changes and memory are lists on its line, each entry naming no beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter's pictures are a list on the line of the beat each shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part a beat has none of is left off its line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line out of order, or a part shaped wrong, refuses the whole file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Writing a file back and reading it again gives the same beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Beats joined end to end are numbered on from the beats before them.",
    },
  ],
} as const satisfies Module
