import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceSecretSync = {
  id: "01a0655d-dab9-7b76-a767-7101666ee41b",
  type: "page-type/module",
  slug: "device-secret-sync",
  definition: "the device secret minted and kept in the shell's keychain",
  code: "tsx",
  test: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where a keychain item sits decides whether the widget extension can read that item.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "An item in the app's default domain satisfies the probe while the extension is refused that item.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell that says no keychain domain is taken as unsaid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unsaid keychain domain mints the secret again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recovery mark is a timestamp rather than a credential.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recovery mark is held in localStorage rather than in the keychain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The recovery mark is keyed per account.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secret never enters this process.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shell with no `present` method answers unanswered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An unanswered presentation decides nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keychain is emptied before another secret is minted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device holding nothing mints on its next launch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clear that fails stops the recovery and writes no mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mint that follows a clear says the device is recovering.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "The native store deletes before the store adds.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A second add over an item the first add left is refused as a duplicate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One mint runs at a time, and a run finding one under way awaits it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A mint the store landed and the keychain refused leaves the two disagreeing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A secret the admission route refuses is let go of on the next launch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret the server no longer accepts looks the same as a good secret from the keychain.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This module is the only caller of the native keychain clear.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A null identity after a render that had an identity is the only edge the clear is reached on.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A whole-document reload boots with no earlier identity to compare against.",
    },
  ],
} as const satisfies Module
