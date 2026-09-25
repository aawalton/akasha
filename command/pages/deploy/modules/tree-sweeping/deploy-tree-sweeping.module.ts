import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployTreeSweeping = {
  id: "01a0c9aa-e537-77da-a7a4-9d0d8d08e341",
  type: "page-type/module",
  slug: "deploy-tree-sweeping",
  definition: "a tree under the git directory no deploy pins, taken away with its index",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree is legitimate where its name is a slug a page of a pinned kind carries.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A tree named for a kind a deploy pins is passed over, so a deploy still built from one keeps it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name settles that, and nothing inside a tree is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which kinds a deploy pins is named here, and the deploy reads that set from here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The workstation kind is named nowhere here, so its tree is swept like any other.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "The module naming the kinds reaches the one pinning a tree, so the set sits here rather than there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree taken goes with the git index that tree is written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What would be taken is answered apart from the taking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is taken with everything under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that will not go is reported against that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every name found is acted on rather than the run ending at the first that refuses.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name whose tree or index will not go is refused rather than counted as taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout whose git directory holds no trees store answers nothing found.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file directly under the trees store is no tree, and is passed over.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No store is taken, so the trees store and the tree indexes store stay.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs after a deploy has pinned its own tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that pins no tree sweeps nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the sweep took is named in the deploy's report.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal here leaves the deploy as it was, because putting the thing up is the deploy's work.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy holds a lock named for its slug, which is the name its tree has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name no deploy pins has no deploy of its own, so nothing here takes a lock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A collision needs a slug renamed while a deploy of its old name runs, and nothing holds for that.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes into a tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which slugs a page of a pinned kind carries is read off the index, and no page is read.",
    },
  ],
} as const satisfies Module
