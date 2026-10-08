import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const processHolding = {
  id: "01a11c5d-a209-75de-b4eb-d4e894ffec0f",
  type: "page-type/module",
  slug: "process-holding",
  definition: "the process running here held to a memory ceiling of its own",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The process running here may be held to a memory ceiling of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A process held here sits in a leaf of the group made for that hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory ceiling of a hold is stated on that leaf.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold answers a way to let the process go.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Letting go moves the process back to the group it was held out of.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Letting go takes away the group the hold made.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A process is held only where the group it came from would take that process back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold that could not be made answers a letting go that does nothing.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing raises where a process cannot be held.",
    },
  ],
  createdAt: "2026-10-08T16:34:20.809Z",
  updatedAt: "2026-10-08T16:34:20.809Z",
} as const satisfies Module
