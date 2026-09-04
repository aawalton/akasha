import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const smsCommandReading = {
  id: "01a0685f-c8ed-7006-a7df-a69c84e56f74",
  pageTypeSlug: "module",
  slug: "sms-command-reading",
  definition: "the words an SMS command was called with, read, and the answer built from them",
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
      statement: "A surface is carried whole and a body loses its closing line endings.",
    },
    {
      invariantKind: "departure",
      statement: "Every refusal a call earns is gathered rather than the first alone.",
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
