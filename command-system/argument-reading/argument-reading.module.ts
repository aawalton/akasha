import type { Module } from "@akasha/code/module"

export const argumentReading = {
  id: "01a077ef-5905-7fba-b8f0-ebffbf6d80d8",
  pageTypeSlug: "module",
  slug: "argument-reading",
  definition: "the arguments a change is handed, read from what a caller wrote on standard input",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A caller writes a change's arguments on standard input rather than as flags.",
    },
    {
      invariantKind: "departure",
      statement: "A scalar argument is a key and the rest of the line after that key's colon.",
    },
    {
      invariantKind: "departure",
      statement: "A body argument is a key and the fence that body ends at.",
    },
    {
      invariantKind: "departure",
      statement: "A fence is the word the caller picks rather than a word this module fixes.",
    },
    {
      invariantKind: "departure",
      statement: "A body holds each line up to the fence.",
    },
    {
      invariantKind: "departure",
      statement: "A line in a body keeps its newline.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body whose opening line closes with `no-newline` drops the newline off its last line.",
    },
    {
      invariantKind: "departure",
      statement: "A passage ending mid-line is said that way and no other way.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing in a body is escaped.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing in a body is counted.",
    },
    {
      invariantKind: "departure",
      statement: "A body no fence closes refuses the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "A key written twice refuses the whole reading.",
    },
    {
      invariantKind: "departure",
      statement: "A line of neither form refuses the whole reading.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a file or reaches an index.",
    },
    {
      invariantKind: "absence",
      statement: "Which arguments a change takes is answered by that change rather than here.",
    },
    {
      invariantKind: "gap",
      statement: "A body with the fence the caller picked ends at that line early.",
    },
  ],
} as const satisfies Module
