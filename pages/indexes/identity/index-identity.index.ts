import type { Index } from "../index/index.page-type.ts"

export const indexIdentity = {
  id: "01a04a4a-23e9-741f-a0ce-e56753a7b13f",
  pageTypeSlug: "index",
  slug: "index-identity",
  definition: "an index from an identifier to the page carrying it",
  name: "identity",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An identity file is found by scope then property then value.",
    },
    {
      invariantKind: "departure",
      statement: "The scope is what an identifier is unique within, a page type or a collection.",
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
      statement:
        "A page's identifiers are the properties its own page type carries stating a `unique`.",
    },
    {
      invariantKind: "departure",
      statement: "An identifier's value is read from a page by the key its property states.",
    },
    {
      invariantKind: "departure",
      statement: "An identifier's value is read as text or as a number.",
    },
    {
      invariantKind: "departure",
      statement: "A file holds one line for each page carrying the value.",
    },
    {
      invariantKind: "departure",
      statement: "A scope no page is filed under has no directory.",
    },
    {
      invariantKind: "departure",
      statement: "No two pages carry one slug inside the reach that slug's property declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying an identifier another page already carries does not land.",
    },
  ],
} as const satisfies Index
