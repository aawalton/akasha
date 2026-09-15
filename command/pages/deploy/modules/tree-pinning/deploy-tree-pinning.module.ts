import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployTreePinning = {
  id: "01a09240-5cd6-7be1-bda8-9fe3ca8d2fe3",
  type: "module",
  slug: "deploy-tree-pinning",
  definition: "the tree a deploy of one kind is built from, pinned at that deploy's commit",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One tree belongs to one kind of deploy, named for that kind.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree sits under the folder every worktree of the checkout shares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree is made once and moved to the commit after that.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Moving costs the files that differ rather than a checkout of the whole tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file git does not track is left where it is when the tree moves.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree pinned at a commit carries the index the pages at that commit imply.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree git will not make or move is refused by naming the kind and the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree whose index will not build is refused the same way.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which files a deploy is built from.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here takes a tree away.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "One thing moves a kind's tree, and that is the deploy of that kind under its own hold.",
    },
  ],
} as const satisfies Module
