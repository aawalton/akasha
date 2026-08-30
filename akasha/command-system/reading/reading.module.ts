import type { Module } from "../../code-system/module/module.page-type.ts"

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
      statement:
        "A line carries the path read and the object id of what was read and when it was read and the object id a mechanical change left.",
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
        "A body answers a reading where it is the body read or the body a mechanical change left.",
    },
    {
      invariantKind: "departure",
      statement: "Reading a body again clears what a mechanical change left.",
    },
    {
      invariantKind: "departure",
      statement:
        "A mechanical change carries a reading of what it changed onto the body it left and to the path it left it at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading is carried only where the body it holds is the one the mechanical change started from.",
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
      statement: "The record's owner is the seat or the subagent acting under it.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent's readings are its own.",
    },
    {
      invariantKind: "departure",
      statement: "A subagent begins holding none of its seat's readings.",
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
      invariantKind: "gap",
      statement: "Nothing stands in the record that did not reach the agent.",
    },
  ],
} as const satisfies Module
