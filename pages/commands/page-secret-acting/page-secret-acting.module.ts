import type { Module } from "@akasha/code/module"

export const pageSecretActing = {
  id: "01a06812-3ce8-7ffb-9691-94df69748ba6",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-secret-acting",
  definition: "what every act over a page's secrets settles before it acts",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A page is named by a path read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "Which keys a page may hold is read off the page type that page names.",
    },
    {
      invariantKind: "departure",
      statement: "A key is spelled as the page type's own key rather than as its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A key the page type does not declare secret is refused before anything is read.",
    },
    {
      invariantKind: "departure",
      statement: "A flag where a value should be is refused rather than read as a value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag with no value is read as said rather than as taking the word after the flag.",
    },
    {
      invariantKind: "departure",
      statement: "A word said as no flag is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller's mistake and the data and an operational fault answer with codes of their own.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file left holding nothing is taken away rather than written empty.",
    },
    {
      invariantKind: "departure",
      statement: "A sops file is written and taken away through a change.",
    },
    {
      invariantKind: "departure",
      statement: "The landing a sops file goes through is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the sops file itself.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
