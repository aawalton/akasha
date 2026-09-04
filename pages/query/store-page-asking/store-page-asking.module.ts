import type { Module } from "@akasha/code-system/module"

export const storePageAsking = {
  id: "01a05aec-eaaa-78d0-9e24-94f935464bf0",
  pageTypeSlug: "module",
  slug: "store-page-asking",
  definition:
    "one page, a page type's shape, the roster, and what names a page, each off composed queries",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page is read as a composed query narrowed to its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page the store does not hold is answered absent rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page is answered with no relation resolved.",
    },
    {
      invariantKind: "departure",
      statement: "A page type's shape is built from the page type's own page.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration takes what the declaration says from the property page the page type names.",
    },
    {
      invariantKind: "departure",
      statement: "The roster names no repository and no glob.",
    },
    {
      invariantKind: "departure",
      statement: "What names a page is found by asking each page type in turn.",
    },
    {
      invariantKind: "departure",
      statement: "A query asked for by name is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an answer for a later question.",
    },
  ],
} as const satisfies Module
