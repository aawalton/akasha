import type { Module } from "@akasha/code-system/module"

export const piping = {
  id: "01a05f4d-3577-7280-96a6-982e5bab7445",
  pageTypeSlug: "module",
  slug: "piping",
  definition: "what a command is handed on standard input",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The input is reached only where the call names no file for a body.",
    },
    {
      invariantKind: "departure",
      statement: "A terminal is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement: "An input holding no byte is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement: "A read of the input waits a stated while and never without end.",
    },
    {
      invariantKind: "departure",
      statement: "The while begins again at every byte that arrives.",
    },
    {
      invariantKind: "departure",
      statement: "An input that carried nothing before the while ran out is nothing piped in.",
    },
    {
      invariantKind: "departure",
      statement:
        "An input that went quiet part way through a body is refused rather than taken as that body.",
    },
    {
      invariantKind: "absence",
      statement: "A body piped in where every path names a file is left unread.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is not text is carried through as the bytes the body is.",
    },
    {
      invariantKind: "departure",
      statement: "A block opens at `<<<<<<< old`.",
    },
    {
      invariantKind: "departure",
      statement: "A block splits at `=======`.",
    },
    {
      invariantKind: "departure",
      statement: "A block closes at `>>>>>>> new`.",
    },
    {
      invariantKind: "departure",
      statement: "A passage is the bytes between its markers with its trailing newline included.",
    },
    {
      invariantKind: "departure",
      statement: "The blocks are answered in the order the blocks are written.",
    },
    {
      invariantKind: "departure",
      statement: "A payload is marker blocks and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A line beginning with a marker run inside a passage is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names what the payload is missing.",
    },
    {
      invariantKind: "absence",
      statement: "This module reaches the disk only at the input itself.",
    },
    {
      invariantKind: "absence",
      statement: "What a caller is told to say instead is handed in by that caller.",
    },
    {
      invariantKind: "gap",
      statement:
        "An input no second descriptor can be opened on is answered as one that would not open.",
    },
  ],
} as const satisfies Module
