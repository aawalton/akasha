import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const commandFilling = {
  id: "01a07c81-8c23-70b6-81d9-34ffaac1e749",
  type: "module",
  slug: "command-filling",
  definition: "what a command was told at a flag, as a bare word, or in the file a flag names",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value said at a flag and as a bare word at once is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A second bare word is the caller's mistake where a command takes a bare word.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag holding prose is answered by a second flag naming the file that prose sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A value said at its flag and at its file at once is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `-` is the input.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not absolute is read against the root handed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A value read whole keeps the line endings at its end, and any other value loses them.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a value is read whole belongs to the filing rather than to the reader.",
    },
    {
      invariantKind: "departure",
      statement: "A file that would not open is answered as a refusal rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pair of values handed in is read as the same pair looked up in what a call said.",
    },
  ],
} as const satisfies Module
