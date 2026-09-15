import type { Index } from "akasha/page/index/index.page-type.types.ts"

export const indexIdentity = {
  id: "01a04a4a-23e9-741f-a0ce-e56753a7b13f",
  type: "index",
  slug: "index-identity",
  definition: "an index from an identifier to the page with it",
  name: "identity",
  code: "ts",
  test: "ts",
  tracked: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identity file is found by unique kind then scope then property then value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page unique across every page is filed under no scope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope is a page type or a property's value under a page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the `page` page type declares an identifier unique across every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has the page's path and its id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug reaches an id without opening the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's identifiers are the properties its own page type has stating a `unique`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identifier's value is read from a page by the key its property states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An identifier's value is read as text or as a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file has one line for each page with the value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope no page is filed under has no directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No two pages have one slug inside the scope that slug's property declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with an identifier another page already has does not land.",
    },
  ],
} as const satisfies Index
