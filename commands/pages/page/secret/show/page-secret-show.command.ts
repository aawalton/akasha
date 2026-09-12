import type { Command } from "akasha/commands/command.page-type.types.ts"

export const pageSecretShow = {
  id: "01a06812-3ce8-7f5f-b3d7-fce6fc2e94e5",
  type: "command",
  slug: "page-secret-show",
  definition: "the command answering with one of a page's secrets, decrypted",
  code: "ts",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
    { said: "--key <name>", takes: "the one secret to decrypt and answer with" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key is refused before anything is decrypted.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page's page type does not declare secret is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A key the sops file does not hold is answered apart from a key the page type does not declare.",
    },
    {
      invariantKind: "departure",
      statement: "The value is answered whole with nothing else beside that value.",
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
  name: "show",
} as const satisfies Command
