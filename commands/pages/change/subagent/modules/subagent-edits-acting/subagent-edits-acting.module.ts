import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const subagentEditsActing = {
  id: "01a09c2d-66f4-7520-9106-1805b0650e05",
  type: "module",
  slug: "subagent-edits-acting",
  definition: "the acts run over the records a seat keeps for the subagents under it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "An act here reaches the records kept beside the calling agent's page for the subagents under it.",
    },
    {
      invariantKind: "departure",
      statement: "The agent's own edits are reached by another module and are not reached here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record is said with the subagent that left it, the time the seat took it, and what it does.",
    },
    {
      invariantKind: "departure",
      statement: "An edit is said the way every act over the edits kept says an edit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record saying no subagent or no time is said as saying none rather than refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record whose line reads as no edit is said as one rather than refusing the file.",
    },
    {
      invariantKind: "departure",
      statement:
        "The records are said in the order the seat took them rather than in the order a name sorts.",
    },
    {
      invariantKind: "departure",
      statement: "A record is numbered by its place in what the seat keeps.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths reads each path against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no record refuses that act rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A record whose line reads as no edit is reached by no path.",
    },
    {
      invariantKind: "departure",
      statement: "An agent keeping no record is said rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A write here takes a lock keyed on the file the write writes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write reads the file again inside that lock rather than trusting an earlier reading.",
    },
    {
      invariantKind: "departure",
      statement: "A file a write leaves lines in is filed in the path index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file a write leaves no line in is taken away and withdrawn from the path index.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether a record landed already.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands a record.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a record.",
    },
  ],
} as const satisfies Module
