import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const transcriptPanel = {
  id: "01a06811-01d3-7004-8ef9-96ac6599463f",
  type: "page-type/module",
  slug: "transcript-panel",
  definition: "the command that opens a seat's transcript, and the seat it asks Alan to pick",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One command opens a transcript.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command given no seat and no path asks Alan to pick a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a seat whose transcript file exists is offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The seats are offered with the most lately written first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A machine with no seat transcript is told so rather than shown a list.",
    },
  ],
} as const satisfies Module
