import type { Command } from "akasha/command/command.page-type.types.ts"

export const pageSecretClear = {
  id: "01a06812-3ce8-7a0e-b33a-5f0e6991b07d",
  type: "page-type/command",
  slug: "page-secret-clear",
  definition: "the command dropping one secret from the sops file beside a page",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A key neither the page type declares nor the sops file holds is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusal names the keys that page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A key the sops file holds is cleared though the page type declares no secret of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key that was the last one the sops file had takes the file with that key.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the sops file does not have is refused rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rest of the file is enciphered again and landed as one change.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts back the secret this command dropped.",
    },
  ],
  name: "clear",
  arguments: [
    { argument: "argument/file-path", required: true },
    { argument: "argument/key", required: true },
    { argument: "argument/commit-message" },
  ],
} as const satisfies Command
