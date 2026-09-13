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
      statement: "A record taken here is appended to the edits the calling agent keeps of its own.",
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
      invariantKind: "departure",
      statement:
        "Whether a record landed already is worked out here from the body that record names.",
    },
    {
      invariantKind: "departure",
      statement: "A record fits where the text it was drafted against is there to change.",
    },
    {
      invariantKind: "departure",
      statement: "A record has left its text where the body already holds what that record leaves.",
    },
    {
      invariantKind: "departure",
      statement: "A record leaving no text behind is judged by what that record fits alone.",
    },
    {
      invariantKind: "departure",
      statement: "A record that fits and has left its text cannot be judged landed.",
    },
    {
      invariantKind: "departure",
      statement: "A record that fits and has not left its text is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A record that fits nothing and has left its text reads as landed already.",
    },
    {
      invariantKind: "departure",
      statement: "A record that fits nothing and has left no text reads as stale.",
    },
    {
      invariantKind: "departure",
      statement: "A record that cannot be judged landed is taken only where the caller says so.",
    },
    {
      invariantKind: "departure",
      statement:
        "A record is judged against the bodies on disk with the edits this agent keeps replayed first.",
    },
    {
      invariantKind: "departure",
      statement:
        "The records are judged in the order the seat took them, each against what the one before leaves.",
    },
    {
      invariantKind: "departure",
      statement:
        "Every record a path names is taken, so a chain of records over one path is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names each record held back and why that record was held back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal over a record that cannot be judged names the call reading that record whole.",
    },
    {
      invariantKind: "departure",
      statement: "A take that refuses leaves every record where it is and keeps no edit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands a record.",
    },
  ],
} as const satisfies Module
