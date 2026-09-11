import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const deployTreePinning = {
  id: "01a09240-5cd6-7be1-bda8-9fe3ca8d2fe3",
  type: "module",
  slug: "deploy-tree-pinning",
  definition: "the tree a deploy of one kind is built from, pinned at that deploy's commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One tree belongs to one kind of deploy, named for that kind.",
    },
    {
      invariantKind: "departure",
      statement: "A tree sits under the folder every worktree of the checkout shares.",
    },
    {
      invariantKind: "departure",
      statement: "A tree is made once and moved to the commit after that.",
    },
    {
      invariantKind: "departure",
      statement: "Moving costs the files that differ rather than a checkout of the whole tree.",
    },
    {
      invariantKind: "departure",
      statement: "A file git does not track is left where it is when the tree moves.",
    },
    {
      invariantKind: "departure",
      statement: "A tree git will not make or move is refused by naming the kind and the commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which files a deploy is built from.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here takes a tree away.",
    },
  ],
} as const satisfies Module
