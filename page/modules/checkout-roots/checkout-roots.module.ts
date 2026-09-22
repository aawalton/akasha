import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const checkoutRoots = {
  id: "01a05cc6-2a1c-7f1e-96c9-e0e9c57ec04e",
  type: "page-type/module",
  slug: "checkout-roots",
  definition: "the repositories checked out beside this one and where a path sits among them",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A checkout is found by the `.git` at the top of that checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned tree is found by the `.pinned-commit` at the top of that tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pinned tree sits inside a checkout, and a path in the tree answers the tree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where the running code came out of and where the database is are two answers.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing answers a repository beside the code a run came out of.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A path under no marked checkout answers the folder two above that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which repositories there are is named here rather than read from disk.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A repository with a page of its own is addressable only once this module names it.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Loading this module reads no disk and works nothing out.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each answer read from disk is worked out once and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repository that is not cloned here is left out rather than named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A root stated in the environment wins over the root found on disk.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where node is absent an answer is refused rather than guessed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A root taken from the environment is kept, and answered even after the environment names none.",
    },
  ],
  answersACheckoutRoot: true,
} as const satisfies Module
