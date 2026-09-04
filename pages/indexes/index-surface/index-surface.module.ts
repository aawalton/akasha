import type { Module } from "@akasha/code-system/module"

export const indexSurface = {
  id: "01a04f55-919c-7d2a-ab3d-8e6aca34022b",
  pageTypeSlug: "module",
  slug: "index-surface",
  definition:
    "the three reads an index answers, and one reading laid over another so a change is read unwritten",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An index is read by three operations and no more operations.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers whether a path stands.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers what a directory lists.",
    },
    {
      invariantKind: "departure",
      statement: "One operation answers the lines an entry file holds.",
    },
    {
      invariantKind: "departure",
      statement: "A reader takes that surface rather than reaching for the disk.",
    },
    {
      invariantKind: "departure",
      statement: "What it reads can be something other than the committed index.",
    },
    {
      invariantKind: "departure",
      statement: "A reading laid over another reading holds only the entry files a change touches.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file emptied by the change does not stand.",
    },
    {
      invariantKind: "departure",
      statement: "A directory left with nothing standing under that directory does not list.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index emptied of every entry stands where the reading beneath that index stands.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no emptied path is listed straight through.",
    },
    {
      invariantKind: "departure",
      statement: "An index that stands nowhere yet is read as one standing and holding nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page body.",
    },
  ],
} as const satisfies Module
