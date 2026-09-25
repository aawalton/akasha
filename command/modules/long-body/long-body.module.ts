import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const longBody = {
  id: "01a0614f-24db-74bb-83ae-6e7c5477cf42",
  type: "page-type/module",
  slug: "long-body",
  definition: "a body longer than an answer handed back a run of whole numbered lines at a time",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "How many bytes one answer has is stated here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run has whole lines.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run begins after the line the caller names as already reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line already reached past the last line begins the run at the first line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run has every further line the answer has room left for.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names the line the run begins at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names the line the run ends at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run names how many lines the body has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run ending at the last line says the whole body reached the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run ending short of the last line says nothing past that line reached the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call for the next run is handed back only where a line is left over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The call for the next run is priced as the widest line number the body can hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal for a line too wide names that line and its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line number is no part of the body.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes to the record of the bodies an agent read.",
    },
  ],
} as const satisfies Module
