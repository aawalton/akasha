import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const treeFilter = {
  id: "01a064d3-f9f9-789e-ad63-cd6848c691b2",
  type: "module",
  slug: "tree-filter",
  definition: "the part of a tree a match keeps and the test a node's fields are matched by",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node matching is kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node with a kept descendant is kept though the node matches nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A node matching nothing and holding no kept descendant is dropped.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A kept node is built again from its kept children rather than carried over whole.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The count is of the nodes that matched rather than of the nodes kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty pattern matches every node.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A pattern is trimmed and lowercased before being matched.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field matches where the field has the pattern anywhere inside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A field that is no string matches nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows how to reach a node's children.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows why a node matches.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows how a node is built again.",
    },
  ],
} as const satisfies Module
