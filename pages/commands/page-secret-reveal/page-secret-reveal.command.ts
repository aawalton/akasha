import type { Command } from "@akasha/command-system/command"

export const pageSecretReveal = {
  id: "01a06812-3ce8-7f5f-b3d7-fce6fc2e94e5",
  pageTypeSlug: "command",
  slug: "page-secret-reveal",
  definition: "the command answering with one of a page's secrets, decrypted",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
    { said: "--key <name>", takes: "the one secret to decrypt and answer with" },
  ],
  helpNotes: [
    "nothing is written: the sops file, the page and the repository are left exactly as they stood.",
    "which keys a page may hold is its page type's call, and a key it does not declare secret is refused before anything is decrypted.",
    "the value reaches the report in the clear, so whatever takes the report decides where it then stands.",
    "a key the sops file does not hold is answered apart from a key the page type does not declare.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is refused before anything is decrypted.",
    },
    {
      invariantKind: "departure",
      statement: "The value is answered whole, with nothing else beside it.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file that will not decrypt is refused rather than read as empty.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a secret out of an earlier commit.",
    },
  ],
} as const satisfies Command
