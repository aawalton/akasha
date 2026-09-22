import type { Command } from "akasha/command/command.page-type.types.ts"

export const pageSecretSet = {
  id: "01a06812-3ce8-74c7-be81-2023948a44d9",
  type: "page-type/command",
  slug: "page-secret-set",
  definition: "the command enciphering a value into the sops file beside a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the page's page type does not declare secret is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the keys that page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The value a set replaces remains in the commit before that set.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value arrives piped in rather than as an argument.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One trailing newline is dropped unless the call says to keep the newline.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value with newlines of its own is taken whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that arrives empty is refused rather than taken as a usable value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The secrets the sops file already has are carried into the file written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Ciphertext carrying no sops mac is refused rather than written.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No value this command takes is written anywhere in the clear.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The composed file is not decrypted again before that file lands.",
    },
    {
      decisionKind: "decision-kind/gap",
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
