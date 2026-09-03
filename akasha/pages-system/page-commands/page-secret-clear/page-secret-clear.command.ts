import type { Command } from "@akasha/command-system/command"

export const pageSecretClear = {
  id: "01a06812-3ce8-7a0e-b33a-5f0e6991b07d",
  pageTypeSlug: "command",
  slug: "page-secret-clear",
  definition: "the command dropping one secret from the sops file beside a page",
  code: "ts",
  changeKindSlug: "change-mechanical",
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
  helpNotes: [
    "what this drops is not coming back through any command here: the value stands in the ciphertext of an earlier commit, and nothing here opens one.",
    "name what a page holds before dropping anything.",
    "where the key was the last one the file held, the file is taken away rather than written empty.",
    "which keys a page may hold is its page type's call, and a key it does not declare secret is refused naming the ones it does.",
    "a key the sops file does not hold is refused rather than passed over.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key that was the last one the sops file held takes the file with it.",
    },
    {
      invariantKind: "departure",
      statement: "A key the sops file does not hold is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "What is left is enciphered again and landed as one change.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here puts back what it dropped.",
    },
  ],
} as const satisfies Command
