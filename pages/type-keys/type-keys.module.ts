import type { Module } from "@akasha/code/module"

export const typeKeys = {
  id: "01a08881-d71d-7652-9d53-add334cdd396",
  pageTypeSlug: "module",
  type: "module",
  slug: "type-keys",
  definition: "the page type keys the code composing a page body states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Code composing a page body states the page type under `type` and under `pageTypeSlug`.",
    },
    {
      invariantKind: "departure",
      statement: "A composed line is read as the page type line by the two spaces opening it.",
    },
    {
      invariantKind: "departure",
      statement: "A key a signature declares is no composed line.",
    },
    {
      invariantKind: "departure",
      statement: "The line after the page type line is where the type key is looked for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "gap",
      statement: "A body composed from a record of keys rather than from lines is read here.",
    },
  ],
} as const satisfies Module
