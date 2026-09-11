import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const valueCarrying = {
  id: "01a087bd-aa76-78f4-b3d4-1c9d3e6e3a8d",
  type: "module",
  slug: "value-carrying",
  definition: "which pages of a page type hold a key, and carrying that value under a second key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The pages carried on are the pages of that page type and of every page type beneath that type.",
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
      statement: "A run over one key answers where those pages sit rather than what each holds.",
    },
    {
      invariantKind: "departure",
      statement: "A run over one key reaches a key the page type no longer declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index does not name is refused.",
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
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "departure",
      statement:
        "The value is handed on as the body spells that value rather than as text to quote.",
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
      statement: "Each page is reached over the edits the pages before that page left.",
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
