import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const outputReaching = {
  id: "01a08fb0-4c21-7a4e-b2f6-9d4a71c3e8b5",
  type: "module",
  slug: "output-reaching",
  definition: "whether what a command writes out reaches the agent that called it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Output going to a pipe or to `/dev/null` does not reach the agent.",
    },
    {
      invariantKind: "departure",
      statement:
        "Output going to a file the shell that called the command did not already have does not reach it.",
    },
    {
      invariantKind: "departure",
      statement: "Output at a terminal reaches whoever asked.",
    },
    {
      invariantKind: "departure",
      statement: "A pipe is judged though the calling shell's own output cannot be read.",
    },
    {
      invariantKind: "stopgap",
      statement: "A file goes unjudged where the calling shell's own output cannot be read.",
    },
    {
      invariantKind: "departure",
      statement: "What a stream is open on is read from the process table rather than guessed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a page.",
    },
  ],
} as const satisfies Module
