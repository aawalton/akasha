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
      statement: "A reading is found by agent, then by path.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the path read, the object id of what was read, and when.",
    },
    {
      invariantKind: "departure",
      statement: "An object id is git's own over the bytes that were read.",
    },
    {
      invariantKind: "departure",
      statement:
        "The record stands beside the index under `.git/data`, and is written again from no page.",
    },
    {
      invariantKind: "departure",
      statement: "One agent's readings are one agent's own file, so two agents never write one.",
    },
    {
      invariantKind: "departure",
      statement: "A reading of a path replaces the one before it, so a path stands at one body.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing stands in the record that did not reach the agent.",
    },
  ],
} as const satisfies Module
