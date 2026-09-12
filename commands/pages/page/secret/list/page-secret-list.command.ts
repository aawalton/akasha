import type { Command } from "akasha/commands/command.page-type.types.ts"

export const pageSecretList = {
  id: "01a06812-3ce8-715d-a904-1eb88e02bd62",
  type: "command",
  slug: "page-secret-list",
  definition: "the command naming which secrets a page holds, none of them decrypted",
  code: "ts",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path that names no page is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The keys held are read off the file standing on disk.",
    },
    {
      invariantKind: "departure",
      statement: "The keys declared are read off the page type the page names.",
    },

    {
      invariantKind: "absence",
      statement: "Nothing here decrypts anything or answers with a value.",
    },
  ],
  name: "list",
} as const satisfies Command
