import type { Command } from "@akasha/command-system/command"

export const pageSecretShow = {
  id: "01a06812-3ce8-715d-a904-1eb88e02bd62",
  pageTypeSlug: "command",
  slug: "page-secret-show",
  definition: "the command naming which secrets a page holds, none of them decrypted",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--file-path <path>",
      takes: "the page, read against the root, rather than its sops file",
    },
  ],
  helpNotes: [
    "the two lines are read from different places and are meant to be compared.",
    "what is held is read off the sops file standing beside the page, and what is secret off the page type claiming it.",
    "nothing is decrypted, since which keys a sops file holds is readable without the key that would open them.",
    "a path no page stands at is refused, because nothing then declares what the page may hold.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The keys held are read off the file standing on disk.",
    },
    {
      invariantKind: "departure",
      statement: "The keys declared are read off the page type the page names.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the page type's own key rather than as its slug.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decrypts anything or answers with a value.",
    },
  ],
} as const satisfies Command
