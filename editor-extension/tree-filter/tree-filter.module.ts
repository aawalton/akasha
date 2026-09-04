import type { Module } from "../../code-system/modules/module.page-type.ts"

export const treeFilter = {
  id: "01a064d3-f9f9-789e-ad63-cd6848c691b2",
  pageTypeSlug: "module",
  slug: "tree-filter",
  definition: "the part of a tree a match keeps and the test a node's fields are matched by",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A node matching is kept.",
    },
    {
      invariantKind: "departure",
      statement: "A node holding a kept descendant is kept though the node matches nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A node matching nothing and holding no kept descendant is dropped.",
    },
    {
      invariantKind: "departure",
      statement:
        "A kept node is built again from its kept children rather than carried over whole.",
    },
    {
      invariantKind: "departure",
      statement: "The count is of the nodes that matched rather than of the nodes kept.",
    },
    {
      invariantKind: "departure",
      statement: "An empty pattern matches every node.",
    },
    {
      invariantKind: "departure",
      statement: "A pattern is trimmed and lowercased before being matched.",
    },
    {
      invariantKind: "departure",
      statement: "A field matches where the field holds the pattern anywhere inside.",
    },
    {
      invariantKind: "departure",
      statement: "A field that is no string matches nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows how to reach a node's children.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows what makes a node match.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows how a node is built again.",
    },
  ],
} as const satisfies Module
