import type { Module } from "@akasha/code/module"

export const editsKeeping = {
  id: "01a0777c-12c6-7383-a773-c4a635e8720f",
  pageTypeSlug: "module",
  slug: "edits-keeping",
  definition: "the edits an agent has answered and not landed, kept beside the agent's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The edits are kept in a file beside the page of the agent answering the edits.",
    },
    {
      invariantKind: "departure",
      statement: "The path index and this module name the file by one rule.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page keeps no edits.",
    },
    {
      invariantKind: "departure",
      statement: "One line holds one edit written as JSON.",
    },
    {
      invariantKind: "departure",
      statement: "A line reading as no edit refuses the whole file rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "That refusal names the line the reading stopped at.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are answered in the order the rows were appended.",
    },
    {
      invariantKind: "departure",
      statement: "A change appends its rows rather than writing the file again.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are read and written again under one turn over the file.",
    },
    {
      invariantKind: "departure",
      statement: "A reader outside that turn never sees the file half written.",
    },
    {
      invariantKind: "departure",
      statement: "The folder holding the page is made before the turn over the file is taken.",
    },
    {
      invariantKind: "departure",
      statement: "A file left holding no row is taken away rather than left empty.",
    },
    {
      invariantKind: "departure",
      statement: "The rows are folded into one answer by the rule one answer is gathered by.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body or judges an edit.",
    },
    {
      invariantKind: "gap",
      statement: "The file is not committed as that file is appended to.",
    },
  ],
} as const satisfies Module
