import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const valueCarrying = {
  id: "01a087bd-aa76-78f4-b3d4-1c9d3e6e3a8d",
  type: "module",
  slug: "value-carrying",
  definition: "which pages of a page type hold a key, and carrying that value under a second key",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages carried on are the pages of that page type and of every page type beneath that type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which pages carry the key is read from the values the index files for each page type.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read to find out which pages carry the key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type with no property under either key is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run over one key answers where those pages sit rather than what each holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run over one key reaches a key the page type no longer declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the index does not name is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with no value under the key read from is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page already with the key written to is passed over rather than refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding one value becomes that value where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A list holding more than one value is refused where the key written to has one value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The value is handed on as the body spells that value rather than as text to quote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many pages are carried on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run handed no count carries on every page with the key read from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count that is no whole number above nothing is refused.",
    },

    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The arguments a run of either shape takes are named here rather than by a caller.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which mechanical changes a page is carried through.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here works out a body of its own.",
    },
  ],
} as const satisfies Module
