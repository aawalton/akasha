import type { Module } from "@akasha/code-system/module"

export const treeReading = {
  id: "01a07220-6ee3-7c98-b086-7e3b497e8b41",
  pageTypeSlug: "module",
  slug: "tree-reading",
  definition: "the files under a tree, and the folders holding no page of this repository's own",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every tree read through here is read by one rule.",
    },
    {
      invariantKind: "departure",
      statement: "The repository root is the akasha folder itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "The vendored packages, the quarantine, git's own store and the agents' working state are left out.",
    },
    {
      invariantKind: "departure",
      statement: "None of those four holds a page of this repository's own.",
    },
    {
      invariantKind: "departure",
      statement: "The four are named rather than matched on a leading dot.",
    },
    {
      invariantKind: "departure",
      statement: "`.server/` under a router app holds module pages a dot rule would drop.",
    },
    {
      invariantKind: "departure",
      statement: "`.supervisors/` keeps copies of module pages that collide with the originals.",
    },
    {
      invariantKind: "departure",
      statement: "A part naming a page left out of the tree is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page is a file whose name says a page type and no section.",
    },
    {
      invariantKind: "departure",
      statement: "The page types a tree admits are read from that tree's own page type pages.",
    },
    {
      invariantKind: "departure",
      statement: "A caller says which file names it takes.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a page's body.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes the index.",
    },
  ],
} as const satisfies Module
