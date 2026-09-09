import type { Module } from "@akasha/code/module"

export const routingCore = {
  id: "01a05bd6-c535-767d-b8ac-7e540084e42d",
  pageTypeSlug: "module",
  type: "module",
  slug: "routing-core",
  definition: "the page keys the store holds in columns of their own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A key held in a column of its own is read back under that key.",
    },
    {
      invariantKind: "departure",
      statement: "A column with nothing is read back as null.",
    },
    {
      invariantKind: "departure",
      statement: "A key the attributes have is read back under that key.",
    },
    {
      invariantKind: "departure",
      statement: "The instant a page was marked done is in a column of its own.",
    },
  ],
} as const satisfies Module
