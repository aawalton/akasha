import type { Index } from "akasha/page/index/index.page-type.types.ts"

export const indexPageType = {
  id: "01a0a55d-2c78-7dfb-a29a-76b06df6e914",
  type: "page-type/index",
  slug: "index-page-type",
  definition: "an index from an identifier unique within a page type to the page with it",
  name: "page-type",
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
      statement: "A file is found by the page type then the property then the value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A scope is the page type the value is unique within.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A slug reaches an id without opening the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file has one line for each page with the value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type no page is filed under has no directory.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page with an identifier another page already has does not land.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page type is read off the page rather than off the path the page sits at.",
    },
  ],
} as const satisfies Index
