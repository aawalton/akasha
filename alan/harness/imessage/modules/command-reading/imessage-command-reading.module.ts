import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const imessageCommandReading = {
  id: "01a0685f-c8ed-7000-adfa-6dd4db0e10c3",
  type: "module",
  slug: "imessage-command-reading",
  definition: "the words an iMessage command was called with, read, and the answer built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The flags and words a command takes are handed in rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag whose value is another flag this module takes is a flag no value followed.",
    },
    {
      invariantKind: "departure",
      statement: "A word alone fills the flag the command names for that word.",
    },
    {
      invariantKind: "departure",
      statement: "A value said both as a word and at its flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that does not repeat is refused where that flag is said twice.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal a call earns is gathered rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement: "Rows arrive newest first and are answered oldest first.",
    },
    {
      invariantKind: "departure",
      statement: "A message Alan sent carries an arrow away from Alan.",
    },
    {
      invariantKind: "departure",
      statement:
        "A call saying `--json` is answered the records, and one saying nothing the lines.",
    },
    {
      invariantKind: "departure",
      statement: "A record carries a message's text whole and a line carries it on one line.",
    },
    {
      invariantKind: "departure",
      statement: "The records are answered on one line rather than spread over many.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here opens a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the mac.",
    },
  ],
} as const satisfies Module
