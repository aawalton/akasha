import type { Command } from "akasha/commands/command.page-type.types.ts"

export const pageSecretClear = {
  id: "01a06812-3ce8-7a0e-b33a-5f0e6991b07d",
  type: "command",
  slug: "page-secret-clear",
  definition: "the command dropping one secret from the sops file beside a page",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
    { said: "--key <name>", takes: "the one secret to drop" },
    {
      said: "--message <msg>",
      takes: "what the commit is for, where the one naming the sops file will not do",
    },
  ],
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
      statement: "A key that was the last one the sops file had takes the file with that key.",
    },
    {
      invariantKind: "departure",
      statement: "A key the sops file does not have is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of the file is enciphered again and landed as one change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts back the secret this command dropped.",
    },
  ],
  name: "clear",
} as const satisfies Command
