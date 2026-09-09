import type { Module } from "@akasha/code/module"

export const deviceSecretSync = {
  id: "01a0655d-dab9-7b76-a767-7101666ee41b",
  pageTypeSlug: "module",
  slug: "device-secret-sync",
  definition: "the device secret minted and kept in the shell's keychain",
  code: "tsx",
  test: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Where a keychain item sits decides whether the widget extension can read that item.",
    },
    {
      invariantKind: "constraint",
      statement:
        "An item in the app's default domain satisfies the probe while the extension is refused it.",
    },
    {
      invariantKind: "departure",
      statement: "A shell that says no keychain domain reads as unsaid, and unsaid re-mints.",
    },
    {
      invariantKind: "departure",
      statement: "The recovery mark is a timestamp rather than a credential.",
    },
    {
      invariantKind: "departure",
      statement: "The recovery mark is held in localStorage rather than in the keychain.",
    },
    { invariantKind: "departure", statement: "The recovery mark is keyed per account." },
    { invariantKind: "departure", statement: "The secret never enters this process." },
    {
      invariantKind: "departure",
      statement: "A shell with no `present` method answers unanswered, which decides nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The keychain is emptied before another secret is minted.",
    },
    { invariantKind: "departure", statement: "A device holding nothing mints on its next launch." },
    {
      invariantKind: "departure",
      statement: "A clear that fails stops the recovery and writes no mark.",
    },
    { invariantKind: "constraint", statement: "The native store deletes before it adds." },
    {
      invariantKind: "departure",
      statement: "A secret the admission route refuses is let go of on the next launch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A secret the server no longer accepts looks the same as a good one from the keychain.",
    },
    {
      invariantKind: "departure",
      statement: "This is the only caller of the native keychain clear.",
    },
    {
      invariantKind: "departure",
      statement:
        "The clear is reached on one edge alone: a null identity after a render that had one.",
    },
    {
      invariantKind: "constraint",
      statement: "A whole-document reload boots with no earlier identity to compare against.",
    },
  ],
} as const satisfies Module
