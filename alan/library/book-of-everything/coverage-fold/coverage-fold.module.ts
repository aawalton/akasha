import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const coverageFold = {
  id: "01a06584-9bf3-7001-a2fe-239b18d512a7",
  pageTypeSlug: "module",
  slug: "coverage-fold",
  definition: "a depth score folded up a tree, half a node's own and half the mean of its children",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A leaf's coverage is its own depth.",
    },
    {
      invariantKind: "departure",
      statement: "A branch weighs its own depth and the mean of its children equally.",
    },
    {
      invariantKind: "departure",
      statement: "A score is read to two decimal places.",
    },
  ],
} as const satisfies Module
