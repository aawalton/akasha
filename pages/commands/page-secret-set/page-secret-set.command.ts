import type { Command } from "@akasha/command-system/command"

export const pageSecretSet = {
  id: "01a06812-3ce8-74c7-be81-2023948a44d9",
  pageTypeSlug: "command",
  slug: "page-secret-set",
  definition: "the command enciphering one value into the sops file beside a page",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
    { said: "--key <name>", takes: "the one secret this sets" },
    {
      said: "--keep-last-newline",
      takes: "the trailing newline, for a value that is a whole file ending in one",
    },
    {
      said: "--message <msg>",
      takes: "what the commit is for, where the one naming the sops file will not do",
    },
  ],
  helpNotes: [
    "the value is enciphered before it reaches disk and is never written anywhere in the clear.",
    "the value is piped in rather than said as an argument, since an argument stands in the process table and in whatever recorded the call.",
    "one trailing newline is dropped, since that is what a shell adds, and `--keep-last-newline` keeps it instead.",
    "a value holding newlines of its own is taken whole, so a certificate or a config file is set as it is.",
    "which keys a page may hold is its page type's call, and a key it does not declare secret is refused naming the ones it does.",
    "what a set replaces stands in the commit before it.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value arrives piped in rather than as an argument.",
    },
    {
      invariantKind: "departure",
      statement: "One trailing newline is dropped unless the call says to keep it.",
    },
    {
      invariantKind: "departure",
      statement: "A value holding newlines of its own is taken whole.",
    },
    {
      invariantKind: "departure",
      statement: "A value that arrives empty is refused rather than standing for a usable one.",
    },
    {
      invariantKind: "departure",
      statement: "The secrets the sops file already holds are carried into the file written.",
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
      statement: "Two secrets valid only as a pair land in a commit each rather than in one.",
    },
  ],
} as const satisfies Command
