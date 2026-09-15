import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const pagesFoldered = {
  id: "01a0a5a9-545f-783d-8733-5a27ccc6ba98",
  type: "module",
  slug: "pages-foldered",
  definition: "whether the pages already in a folder sit as files or in folders of their own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder holding a page file of that type holds its pages as files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder holding a subfolder and no such page file holds its pages in folders.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder holding neither is answered as holding its pages as files.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page file of another page type shapes nothing here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that is not there is read as holding nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
