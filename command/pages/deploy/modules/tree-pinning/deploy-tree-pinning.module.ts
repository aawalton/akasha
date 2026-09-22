import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployTreePinning = {
  id: "01a09240-5cd6-7be1-bda8-9fe3ca8d2fe3",
  type: "page-type/module",
  slug: "deploy-tree-pinning",
  definition: "the tree a deploy of one kind is built from, pinned at that deploy's commit",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One tree belongs to one kind of deploy, named for that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree sits under the git directory of the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A tree is a plain export with no git directory in it, so nothing running in a tree can commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edit written into a tree is lost at the next move, so an edit goes back to the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The git index a kind's tree is written from sits beside the trees under that same git directory.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree is made once and moved to the commit after that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Moving costs the files that differ rather than a checkout of the whole tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file git does not track is left where it is when a tree moves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree holds what its commit holds at every path that commit names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file git ignores is left, so what a build wrote there survives the move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An index answer at a path the commit does not name goes rather than being read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree pinned at a commit carries the index that commit carries.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here builds the index a tree carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit a tree is pinned at is written into a stamp at the root of that tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stamp is written after the move, so no reader is handed a commit the tree lacks.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stamp is written beside itself and renamed over, so no reader is handed half of one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stamp is a file git does not track, so a move leaves it where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The stamp a run reads is the nearest one at or above the folder that run was loaded from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading it is one read of one small file rather than a run of git.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run with no stamp above the folder it was loaded from came out of no tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A stamp holding no commit reads as no commit rather than as an empty one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree git will not make or move is refused by naming the kind and the commit.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says which files a deploy is built from.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here takes a tree away.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "One thing moves a kind's tree, and that is the deploy of that kind under its own hold.",
    },
  ],
} as const satisfies Module
