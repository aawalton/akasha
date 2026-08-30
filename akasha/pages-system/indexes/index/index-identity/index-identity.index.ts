import type { Index } from "../index.page-type.ts"

export const indexIdentity = {
  id: "01a04a4a-23e9-741f-a0ce-e56753a7b13f",
  pageTypeSlug: "index",
  slug: "index-identity",
  definition: "an index from an identifier to the page carrying it",
  indexName: "identity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An identity file is found by scope then property then value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is the page type an identifier is unique within.",
    },
    {
      invariantKind: "departure",
      statement: "Only the `page` page type declares an identifier unique across every page.",
    },
    {
      invariantKind: "departure",
      statement: "A line carries the page's path and its id.",
    },
    {
      invariantKind: "departure",
      statement: "A slug reaches an id without opening the page.",
    },
    {
      invariantKind: "departure",
      statement: "The identifiers are the properties stating a `unique`.",
    },
    {
      invariantKind: "departure",
      statement: "The properties stating a `unique` today are `id` and `slug`.",
    },
    {
      invariantKind: "departure",
      statement: "A file holds one line for each page carrying the value.",
    },
    {
      invariantKind: "departure",
      statement: "No two pages carry one id.",
    },
    {
      invariantKind: "departure",
      statement: "No two pages of one page type carry one slug.",
    },
    {
      invariantKind: "departure",
      statement: "The index takes its identifiers from what the properties declare.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying an identifier another page already carries does not land.",
    },
  ],
} as const satisfies Index
