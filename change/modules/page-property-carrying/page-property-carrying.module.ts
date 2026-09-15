import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagePropertyCarrying = {
  id: "01a09c81-2511-7a94-a723-347861af2d7a",
  type: "module",
  slug: "page-property-carrying",
  definition: "which pages carry a page property's values, and which files beside them hold them",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages carrying a key are the pages of every page type named and of every type beneath.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no value under that key is left out rather than answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page reached under two page types is answered once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count handed in holds how many pages are answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The value each page states under that key is answered beside that page's path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The key a record property's records sit under is the slug that property's page states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The pages stating those records are the pages of every page type declaring the record.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The files of entries under a shape are the files beside every page stating that shape's key.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the world holds no body for is left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A record or a shape no page type declares reaches no page here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page types declare a property is read from the index rather than a body.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files beside one page are answered without reaching any other page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The files beside a page are the uncommitted files where the caller asks for those.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page body is read here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here answers a passage or an edit.",
    },
  ],
} as const satisfies Module
