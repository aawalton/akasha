import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const statusTree = {
  id: "01a06584-9bf3-7007-8182-47bcd0f1ac9a",
  pageTypeSlug: "module",
  slug: "status-tree",
  definition: "the book folders on disk read into a tree, each node with what its profile says",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder holding a profile is a node.",
    },
    {
      invariantKind: "departure",
      statement: "A child folder's name opens with two digits and a dash.",
    },
    {
      invariantKind: "departure",
      statement: "Children are read in the order their names sort.",
    },
    {
      invariantKind: "departure",
      statement: "A node's path is written from the root of the books.",
    },
  ],
} as const satisfies Module
