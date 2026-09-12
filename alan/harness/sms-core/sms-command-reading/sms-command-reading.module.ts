import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const smsCommandReading = {
  id: "01a0685f-c8ed-7006-a7df-a69c84e56f74",
  type: "module",
  slug: "sms-command-reading",
  definition: "the words an SMS command was called with, read, and the answer built from them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The arguments a command takes are handed in rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A flag the command does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag whose value is another flag the command takes is a flag no value followed.",
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
      statement: "Every refusal a call earns is gathered rather than the first alone.",
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
      statement: "Nothing here reaches the carrier.",
    },
    {
      invariantKind: "absence",
      statement: "No credential is read from the environment here.",
    },
  ],
} as const satisfies Module
