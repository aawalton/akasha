import type { Module } from "@akasha/code/module"

export const valueCarrying = {
  id: "01a087bd-aa76-78f4-b3d4-1c9d3e6e3a8d",
  pageTypeSlug: "module",
  slug: "value-carrying",
  definition: "carrying one key's value under a second key on the pages of one page type",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages carried on are the pages of that page type and of every page type beneath it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which pages carry the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "absence",
      statement: "No page body is read to find out which pages carry the key.",
    },
    {
      invariantKind: "departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A list of one becomes one value where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement: "A list of more than one is refused where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement: "The value is handed on as the body spells it rather than as text to quote.",
    },
    {
      invariantKind: "departure",
      statement: "A count handed in holds how many pages are carried on.",
    },
    {
      invariantKind: "departure",
      statement: "A run handed no count carries on every page with the key read from.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no whole number above nothing is refused.",
    },
    {
      invariantKind: "departure",
      statement: "Each page is reached over the edits the pages before it left.",
    },
    {
      invariantKind: "departure",
      statement: "A change reached and refused is answered by the reason that change gave.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which mechanical changes a page is carried through.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
} as const satisfies Module
