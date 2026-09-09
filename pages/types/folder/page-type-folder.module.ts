import type { Module } from "@akasha/code/module"

export const pageTypeFolder = {
  id: "01a07690-d4cb-70b5-ab1b-698ad6ee2f09",
  pageTypeSlug: "module",
  type: "module",
  slug: "page-type-folder",
  definition: "the folder a page type's pages sit in, made from its plural and its parent's name",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder is named for the plural its page type states.",
    },
    {
      invariantKind: "departure",
      statement: "The parent's name is dropped off the front of that plural where the front is it.",
    },
    {
      invariantKind: "departure",
      statement: "The parent's plural is tried before the parent's slug.",
    },
    {
      invariantKind: "departure",
      statement: "A plural the parent's name does not open is the folder whole.",
    },
    {
      invariantKind: "departure",
      statement: "A name is dropped only where a `-` follows the name.",
    },
    {
      invariantKind: "departure",
      statement: "Part of a word is never dropped.",
    },
    {
      invariantKind: "departure",
      statement: "A page type stating its slug as its plural is named for that slug.",
    },
    {
      invariantKind: "constraint",
      statement: "The folder this answers differs from the folder some page types sit in today.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page or an index or the disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here answers where the parent's own folder is.",
    },
  ],
} as const satisfies Module
