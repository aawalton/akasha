import type { Module } from "@akasha/code-system/module"

export const instructionsTreeDependencies = {
  id: "01a069cc-a5df-7747-ba0a-fdf585827ea0",
  pageTypeSlug: "module",
  slug: "instructions-tree-dependencies",
  definition: "a probe refusing an instructions tree whose declared packages are not inside it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package resolving outside the tree is a fault, not only a missing one.",
    },
    {
      invariantKind: "departure",
      statement: "A tree declaring no package is refused rather than answered as sound.",
    },
    {
      invariantKind: "departure",
      statement: "Loading two of the declared packages is what says the tree runs.",
    },
    {
      invariantKind: "departure",
      statement: "A fault list longer than eight names eight and counts the rest.",
    },
  ],
} as const satisfies Module
