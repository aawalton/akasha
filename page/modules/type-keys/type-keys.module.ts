import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const typeKeys = {
  id: "01a08881-d71d-7652-9d53-add334cdd396",
  type: "module",
  slug: "type-keys",
  definition: "the page type keys the code composing a page body states",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Code composing a page body states the page type under `type` and under `pageTypeSlug`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A composed line is read as the page type line by the two spaces opening it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A key a signature declares is no composed line.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The type key is looked for on the page type line itself and on the line after it.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the disk.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A body composed from a record of keys rather than from lines is read here.",
    },
  ],
} as const satisfies Module
