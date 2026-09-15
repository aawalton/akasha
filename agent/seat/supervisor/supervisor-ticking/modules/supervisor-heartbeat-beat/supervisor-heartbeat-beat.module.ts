import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const supervisorHeartbeatBeat = {
  id: "01a06871-3115-7000-88a3-356a4726a3a1",
  type: "module",
  slug: "supervisor-heartbeat-beat",
  definition: "the seat page writes a supervisor makes through the seat page beat",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every write here reaches the seat page beat rather than writing the page itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that can await the beat calls the beat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that cannot await the beat runs the beat as a child.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child's report is the last line of that child's stdout read as JSON.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Output that is no object with an outcome is read as a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A beat that throws or never ran is a refusal naming the fault rather than a throw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refused write is logged and swallowed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Taking the seat page down hands its outcome back instead of logging that outcome.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat with no composed name and no name in its history is not recorded at all.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The process key is written beside the seat.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure writing the process key is logged alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The mode a supervisor is running in is written beside the seat with that supervisor's process key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That mode is read off this supervisor's own command line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the beat module sits is asked of the index rather than spelled.",
    },
  ],
} as const satisfies Module
