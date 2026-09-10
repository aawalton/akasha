import type { Index } from "../index.page-type.types.ts"

export const indexRelation = {
  id: "01a04a4a-23e9-77f1-b8ce-68661b5a2925",
  pageTypeSlug: "index",
  type: "index",
  slug: "index-relation",
  definition: "an index from a page to the pages naming it",
  name: "relation",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An edge file is found by target id then source property then source page id.",
    },
    {
      invariantKind: "departure",
      statement: "An edge is filed under the target's id whichever identifier the source wrote.",
    },
    {
      invariantKind: "departure",
      statement: "A leaf is named for the source's id.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page's identity is its id and its slug and the page type its slug is unique within.",
    },
    {
      invariantKind: "departure",
      statement: "A page's identity files no edge.",
    },
    {
      invariantKind: "departure",
      statement: "The identity index files a page's identity.",
    },
    {
      invariantKind: "departure",
      statement: "A name reaching no page files no edge.",
    },
    {
      invariantKind: "departure",
      statement: "One write creates and removes only files that write alone owns.",
    },
    {
      invariantKind: "departure",
      statement: "A relation free to name more than one page type has the page type in its value.",
    },
    {
      invariantKind: "departure",
      statement:
        "A relation nested in a record files an edge from its page rather than from its entry.",
    },
    {
      invariantKind: "departure",
      statement: "A relation nested one record deep is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A relation nested deeper than one record is not reached.",
    },
  ],
} as const satisfies Index
