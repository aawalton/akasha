import type { Module } from "@akasha/code-system/module"

export const supervisorHeartbeatBeat = {
  id: "01a06871-3115-7000-88a3-356a4726a3a1",
  pageTypeSlug: "module",
  slug: "supervisor-heartbeat-beat",
  definition: "the seat page writes a supervisor makes by running the seat page beat as a child",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every write here runs tools/seat-page-beat.ts as a child rather than writing the page itself.",
    },
    {
      invariantKind: "departure",
      statement: "The report is the last line of the child's stdout, read as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "Output that is no object carrying an outcome is read as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A child that never ran is a refusal naming the error rather than a throw.",
    },
    {
      invariantKind: "departure",
      statement: "A refused write is logged and swallowed, so no beat fails its caller.",
    },
    {
      invariantKind: "departure",
      statement: "Taking the seat page down hands its outcome back instead of logging it.",
    },
    {
      invariantKind: "departure",
      statement: "A seat with no composed name and none in its history is not recorded at all.",
    },
    {
      invariantKind: "departure",
      statement: "The process key is written beside the seat, and a failure there is logged alone.",
    },
    {
      invariantKind: "gap",
      statement: "The beat script is reached in the old tree at tools/seat-page-beat.ts.",
    },
  ],
} as const satisfies Module
