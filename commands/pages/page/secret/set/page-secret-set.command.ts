import type { Command } from "akasha/commands/command.page-type.types.ts"

export const pageSecretSet = {
  id: "01a06812-3ce8-74c7-be81-2023948a44d9",
  type: "command",
  slug: "page-secret-set",
  definition: "the command enciphering one value into the sops file beside a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key the page's page type does not declare secret is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal names the keys that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "The value a set replaces remains in the commit before that set.",
    },
    {
      invariantKind: "departure",
      statement: "A value arrives piped in rather than as an argument.",
    },
    {
      invariantKind: "departure",
      statement: "One trailing newline is dropped unless the call says to keep the newline.",
    },
    {
      invariantKind: "departure",
      statement: "A value with newlines of its own is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A value that arrives empty is refused rather than taken as a usable value.",
    },
    {
      invariantKind: "departure",
      statement: "The secrets the sops file already has are carried into the file written.",
    },
    {
      invariantKind: "departure",
      statement: "Ciphertext carrying no sops mac is refused rather than written.",
    },
    {
      invariantKind: "absence",
      statement: "No value this command takes is written anywhere in the clear.",
    },
    {
      invariantKind: "gap",
      statement: "The composed file is not decrypted again before that file lands.",
    },
    {
      invariantKind: "gap",
      statement: "Two secrets valid only as a pair land in two commits rather than in one commit.",
    },
  ],
  name: "set",
  arguments: [
    { argument: "argument/file-path", required: true },
    { argument: "argument/key", required: true },
    { argument: "argument/commit-message" },
    { argument: "argument/keep-last-newline" },
  ],
} as const satisfies Command
