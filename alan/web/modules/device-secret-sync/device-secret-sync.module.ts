import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deviceSecretSync = {
  id: "01a0655d-dab9-7b76-a767-7101666ee41b",
  type: "module",
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
        "An item in the app's default domain satisfies the probe while the extension is refused that item.",
    },
    {
      invariantKind: "departure",
      statement: "A shell that says no keychain domain reads as unsaid.",
    },
    {
      invariantKind: "departure",
      statement: "An unsaid keychain domain mints the secret again.",
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
      statement: "A shell with no `present` method answers unanswered.",
    },
    {
      invariantKind: "departure",
      statement: "An unanswered presentation decides nothing.",
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
    { invariantKind: "constraint", statement: "The native store deletes before the store adds." },
    {
      invariantKind: "departure",
      statement: "A secret the admission route refuses is let go of on the next launch.",
    },
    {
      invariantKind: "departure",
      statement:
        "A secret the server no longer accepts looks the same as a good secret from the keychain.",
    },
    {
      invariantKind: "departure",
      statement: "This module is the only caller of the native keychain clear.",
    },
    {
      invariantKind: "departure",
      statement:
        "A null identity after a render that had an identity is the only edge the clear is reached on.",
    },
    {
      invariantKind: "constraint",
      statement: "A whole-document reload boots with no earlier identity to compare against.",
    },
  ],
} as const satisfies Module
