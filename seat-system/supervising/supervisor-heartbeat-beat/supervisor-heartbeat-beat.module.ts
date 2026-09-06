import type { Module } from "@akasha/code-system/module"

export const supervisorHeartbeatBeat = {
  id: "01a06871-3115-7000-88a3-356a4726a3a1",
  pageTypeSlug: "module",
  slug: "supervisor-heartbeat-beat",
  definition: "the seat page writes a supervisor makes through the seat page beat",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every write here reaches the seat page beat rather than writing the page itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write that can await the beat calls it, and one that cannot runs it as a child.",
    },
    {
      invariantKind: "departure",
      statement: "A child's report is the last line of its stdout, read as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "Output that is no object carrying an outcome is read as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A beat that throws or never ran is a refusal naming the fault, not a throw.",
    },
    {
      invariantKind: "departure",
      statement: "A refused write is logged and swallowed, so no beat fails its caller.",
    },
    {
      invariantKind: "departure",
      statement:
        "Taking the seat page down hands its outcome back instead of logging that outcome.",
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
      invariantKind: "departure",
      statement:
        "The mode a supervisor is running in is written beside the seat with that supervisor's process key.",
    },
    {
      invariantKind: "departure",
      statement: "That mode is read off this supervisor's own command line.",
    },
    {
      invariantKind: "departure",
      statement: "The beat module is reached beside this one rather than by a path from the root.",
    },
    {
      invariantKind: "departure",
      statement:
        "The beat is imported from beside this one, so a move of the beat is a diagnostic.",
    },
  ],
} as const satisfies Module
