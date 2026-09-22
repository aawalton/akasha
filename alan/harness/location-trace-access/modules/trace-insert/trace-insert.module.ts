import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const traceInsert = {
  id: "01a05bc7-9129-700d-9b3a-ba23544a6e88",
  type: "page-type/module",
  slug: "trace-insert",
  definition: "a batch of recorded places landed as rows beside each place's capture day",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The phone drops a batch for good on any 200 whose body parses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trace lands on the rows beside the day page for the ESO day the trace was captured in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two traces from one device at one sequence and one instant are one trace.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace already filed is left as it is rather than filed a second time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch with no trace is answered with a count of zero and no write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The count answered is the batch's own length rather than how many rows were added.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A batch that cannot be kept whole is refused rather than answered short.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal keeps a batch on the phone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A trace is written through the pages rather than onto a checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write names the commit the rows were read at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A write the pages refuse is tried again from a fresh read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Five tries are made at the most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change meant that named no commit is refused rather than answered as done.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day landed before a later day is refused keeps the rows that day took.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the day page the rows sit beside.",
    },
  ],
} as const satisfies Module
