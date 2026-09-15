import type { Index } from "akasha/page/index/index.page-type.types.ts"

export const indexPage = {
  id: "01a0a55d-2c77-7a99-a11b-d9003c2b25ca",
  type: "page-type/index",
  slug: "index-page",
  definition: "an index from an identifier unique across every page to the page with it",
  name: "page",
  code: "ts",
  test: "ts",
  tracked: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The index is named for the unique kind it files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is found by the property then the value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page unique across every page is filed under no scope.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the `page` page type declares an identifier unique across every page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id reaches a page without opening any page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file has one line for each page with the value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with an identifier another page already has does not land.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An identifier unique within anything narrower is filed nowhere here.",
    },
  ],
} as const satisfies Index
