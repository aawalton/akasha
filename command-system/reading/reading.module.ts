import type { Module } from "@akasha/code-system/module"

export const reading = {
  id: "01a04e96-c80a-79ef-819f-a455a96a0e54",
  pageTypeSlug: "module",
  slug: "reading",
  definition: "what an agent has read, kept beside the index and answered in one file read",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reading is found by agent and then by path.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the path read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the object id of what was read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries when the path was read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the object id a mechanical change left.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries how far into the body the agent has read.",
    },
    {
      invariantKind: "departure",
      statement: "A line carrying no reach into the body means the whole body reached the agent.",
    },
    {
      invariantKind: "departure",
      statement: "A reading carrying a reach into the body answers no body.",
    },
    {
      invariantKind: "departure",
      statement: "An object id is git's own over the bytes that were read.",
    },
    {
      invariantKind: "departure",
      statement: "The record stands beside the index under `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "The record is written again from no page.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's readings are one agent's own file.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a path replaces the one before it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body answers a reading where the body is the body read or the body a mechanical change left.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a body again clears what a mechanical change left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mechanical change carries a reading of what changed onto the body and path the change left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is carried only where the body it holds is the one the mechanical change started from.",
    },
    {
      invariantKind: "departure",
      statement: "A mechanical change carries how far into the body the agent had read.",
    },
    {
      invariantKind: "departure",
      statement: "The body a mechanical change left answers what a warrant asks.",
    },
    {
      invariantKind: "departure",
      statement: "The body a mechanical change left does not answer writing over that body itself.",
    },
    {
      invariantKind: "departure",
      statement: "The record's owner is the seat or the subagent acting under that seat.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's readings are its own.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent begins holding no reading its seat holds.",
    },
    {
      invariantKind: "departure",
      statement: "An acting name the seat's id does not begin is not honoured.",
    },
    {
      invariantKind: "departure",
      statement: "The seat owns the record when an acting name does not begin with its id.",
    },
    {
      invariantKind: "departure",
      statement: "A removal forgets the reading of what went for every agent.",
    },
    {
      invariantKind: "departure",
      statement: "A read whose output would not reach the agent is refused and leaves no reading.",
    },
    {
      invariantKind: "departure",
      statement: "Output going to a pipe or to `/dev/null` does not reach the agent.",
    },
    {
      invariantKind: "departure",
      statement:
        "Output going to a file the shell that called it did not already have does not reach the agent.",
    },
    {
      invariantKind: "stopgap",
      statement: "A file goes unjudged where the calling shell's own output cannot be read.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing stands in the record that did not reach the agent.",
    },
  ],
} as const satisfies Module
