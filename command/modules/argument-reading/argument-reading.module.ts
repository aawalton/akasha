import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const argumentReading = {
  id: "01a077ef-5905-7fba-b8f0-ebffbf6d80d8",
  type: "page-type/module",
  slug: "argument-reading",
  definition: "the arguments a change is handed, read from what a caller wrote on standard input",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller writes a change's arguments on standard input rather than as flags.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scalar argument is a key and the rest of the line after that key's colon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body argument is a key and the fence that body ends at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fence is the word the caller picks rather than a word this module fixes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body holds each line up to the fence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line in a body keeps its newline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A body whose opening line closes with `no-newline` drops the newline off its last line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage drops the newline its fence leaves on its last line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage taking the newline after it ends with a blank line before its fence.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage whose opening line closes with `no-newline` is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A passage written as `key: value` is left as it was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which arguments are passages is answered by the change taking them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing in a body is escaped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing in a body is counted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body no fence closes refuses the whole reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key written twice refuses the whole reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line of neither form refuses the whole reading.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a file or reaches an index.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Which arguments a change takes is answered by that change rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A body with the fence the caller picked ends at that line early.",
    },
  ],
} as const satisfies Module
