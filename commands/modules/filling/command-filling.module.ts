import type { Module } from "@akasha/code/module"

export const commandFilling = {
  id: "01a07c81-8c23-70b6-81d9-34ffaac1e749",
  pageTypeSlug: "module",
  type: "module",
  slug: "command-filling",
  definition: "what a command was told at a flag or as a bare word, and the file a flag names",
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
      invariantKind: "absence",
      statement: "Nothing here opens the file that second flag names.",
    },
  ],
} as const satisfies Module
