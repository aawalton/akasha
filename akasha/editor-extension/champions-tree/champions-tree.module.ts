import type { Module } from "../../code-system/modules/module.page-type.ts"

export const championsTree = {
  id: "01a06584-9bf3-7000-a10f-f23c6429fe58",
  pageTypeSlug: "module",
  slug: "champions-tree",
  definition: "a tree of domain rows, each hung under the domain it names as its parent",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A domain naming a parent no row answers to is a root rather than left out.",
    },
    {
      invariantKind: "departure",
      statement: "A domain naming itself as its parent is a root.",
    },
    {
      invariantKind: "departure",
      statement: "A parent's sequence places the children it names ahead of those it does not.",
    },
    {
      invariantKind: "departure",
      statement: "A child a second parent also names is hung under the first parent alone.",
    },
    {
      invariantKind: "departure",
      statement: "A domain no root reaches is named rather than swallowed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A node whose descent reaches no persona names no champion rather than an empty one.",
    },
  ],
} as const satisfies Module
