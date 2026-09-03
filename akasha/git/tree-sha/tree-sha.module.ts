import type { Module } from "@akasha/code-system/module"

export const treeSha = {
  id: "01a06816-2f10-79f0-a96f-ee6577f1c3a8",
  pageTypeSlug: "module",
  slug: "tree-sha",
  definition: "the object name of the tree a commit holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A tree's name is a type of its own rather than any string.",
    },
    {
      invariantKind: "departure",
      statement: "A commit git could not read throws.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is not forty lower hex digits throws rather than being answered.",
    },
  ],
} as const satisfies Module
