import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexRelation = {
  id: "01a04a4a-23e9-77f1-b8ce-68661b5a2925",
  type: "index",
  slug: "index-relation",
  definition: "an index from a page to the pages naming it",
  name: "relation",
  code: "ts",
  test: "ts",
  tracked: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge file is found by target id then source property then source page id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An edge is filed under the target's id whichever identifier the source wrote.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A leaf is named for the source's id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's identity is its id and its slug and the page type its slug is unique within.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's identity files no edge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name held as a page's identity refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page stating no `id` refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The identity index files a page's identity.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching no page files no edge.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name for a mortal page type refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name held by a mortal page refuses nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One write creates and removes only files that write alone owns.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation free to name more than one page type has the page type in its value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relation nested in a record files an edge from its page rather than from its entry.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation nested one record deep is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation nested deeper than one record is not reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A relation in an entry row files an edge from the row's page rather than from the row.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation an entry row states is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation nested in a record inside an entry row is not reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rows are handed in rather than read here.",
    },
  ],
} as const satisfies Index
