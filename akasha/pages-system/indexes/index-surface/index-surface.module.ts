import type { Module } from "../../../code-system/module/module.page-type.ts"

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
      statement:
        "An index is read by three operations and no more — whether a path stands and what a directory lists and the lines an entry file holds.",
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
      statement: "A reading laid over another holds only the entry files a change touches.",
    },
    {
      invariantKind: "departure",
      statement: "An entry file emptied by the change does not stand.",
    },
    {
      invariantKind: "departure",
      statement: "A directory left with nothing standing under it does not list.",
    },
    {
      invariantKind: "departure",
      statement: "A directory holding no emptied path is listed straight through.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here writes. A reading laid over another puts no file on the disk and takes none away.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here reads a page body. A page's own file stands in the repository rather than in the index.",
    },
  ],
} as const satisfies Module
