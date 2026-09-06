import type { Module } from "@akasha/code/module"

export const pageRenaming = {
  id: "01a076d6-81be-7ed1-9c02-e980829f1c6f",
  pageTypeSlug: "module",
  slug: "page-renaming",
  definition: "a page slug rename run by the change page that renames a page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The address a page is at is resolved before the change page is run.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal the change page gives is answered as this module's own refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The change page answers a body under the path that body lands at.",
    },
    {
      invariantKind: "departure",
      statement:
        "A body under the path a file moved to is said under the path that file moved from.",
    },
    {
      invariantKind: "departure",
      statement: "Every file the change page moved is handed to the landing as a carry.",
    },
    {
      invariantKind: "departure",
      statement: "A plural reaches the change page only where the caller said a plural.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many files were carried.",
    },
    {
      invariantKind: "departure",
      statement: "The report says how many files naming the page were repointed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a dry run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body.",
    },
  ],
} as const satisfies Module
