import type { Index } from "akasha/pages/indexes/index.page-type.types.ts"

export const indexListing = {
  id: "01a08138-9650-7969-9bcb-c2ac45799256",
  type: "index",
  slug: "index-listing",
  definition: "an index from the repository to every path its pages claim",
  name: "listing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One file has every path the pages claim.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line has one path and nothing more.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is filed here only when the page has an id.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is filed here only when the page has a slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is filed here only when the page has a page type.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's sops file is filed here only where that file is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's sops file is filed here only where the page's type declares a secret.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page's uncommitted file is filed here only where the page's type declares an uncommitted value.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's uncommitted file is filed here only where that file is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Whether a numbered file is there is read from the change laid over the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A file filed here for a page that does not state it is filed only where it is there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder a page holds is filed here under its own path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files are there is one file read rather than a tree listed.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing filed here says which page a path belongs to.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Which page a path belongs to is read off that path's own name rather than filed.",
    },
  ],
} as const satisfies Index
