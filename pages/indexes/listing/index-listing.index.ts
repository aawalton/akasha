import type { Index } from "../index.page-type.types.ts"

export const indexListing = {
  id: "01a08138-9650-7969-9bcb-c2ac45799256",
  pageTypeSlug: "index",
  type: "index",
  slug: "index-listing",
  definition: "an index from the repository to every path its pages claim",
  name: "listing",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One file has every path the pages claim.",
    },
    {
      invariantKind: "departure",
      statement: "A line has one path and nothing more.",
    },
    {
      invariantKind: "departure",
      statement: "A path is filed here where the path index files that path.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths filed here are read off what the path index files rather than worked out again.",
    },
    {
      invariantKind: "departure",
      statement: "Which files are there is one file read rather than a walk of the path tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing filed here says which page a path belongs to.",
    },
  ],
} as const satisfies Index
