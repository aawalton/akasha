import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const imessageCommandReading = {
  id: "01a0685f-c8ed-7000-adfa-6dd4db0e10c3",
  pageTypeSlug: "module",
  slug: "imessage-command-reading",
  definition: "the words an iMessage command was called with, read, and the answer built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What a command takes is handed in rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A flag whose value is another flag this takes is a flag no value followed.",
    },
    {
      invariantKind: "departure",
      statement: "A word standing alone fills the flag the command names for it.",
    },
    {
      invariantKind: "departure",
      statement: "What is said both as a word and at its flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that does not repeat is refused where it is said twice.",
    },
    {
      invariantKind: "departure",
      statement:
        "Text is said at its flag or read from a file, and saying it both ways is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `-` is the input.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is not absolute is read against the repository root.",
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
      statement: "A message Alan sent carries an arrow away from him.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fault thrown at the mac is answered as operational unless it names its own code.",
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
