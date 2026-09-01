import type { Module } from "@akasha/code-system/module"

export const rebuilding = {
  id: "01a0584f-30ed-7000-bd17-95f4f41ac634",
  pageTypeSlug: "module",
  slug: "rebuilding",
  definition: "the index built whole beside the one standing, and put in its place",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index is built into a scratch directory standing beside the index.",
    },
    {
      invariantKind: "departure",
      statement: "The scratch directory is taken away however the build ends.",
    },
    {
      invariantKind: "departure",
      statement: "What was built is put in place by renaming rather than by copying.",
    },
    {
      invariantKind: "departure",
      statement: "The index being replaced is moved aside before the new one is renamed over it.",
    },
    {
      invariantKind: "departure",
      statement: "A build putting nothing in place is answered for as fully as one that does.",
    },
    {
      invariantKind: "departure",
      statement: "What differs between two indexes is read by walking both.",
    },
    {
      invariantKind: "departure",
      statement: "The stamp the build wrote is handed back rather than read again by the caller.",
    },
    {
      invariantKind: "departure",
      statement: "Where the index stands is derived from the repository root given here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides whether a rebuild should run.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says in words what a rebuild did.",
    },
  ],
} as const satisfies Module
