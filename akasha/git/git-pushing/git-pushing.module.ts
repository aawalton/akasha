import type { Module } from "@akasha/code-system/module"

export const gitPushing = {
  id: "01a068ae-fd9c-7003-9693-a93bade6fb89",
  pageTypeSlug: "module",
  slug: "git-pushing",
  definition:
    "the branch pushed to the remote it tracks, saying plainly what a failure did and did not cost",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A checkout with no remote has nothing to push to and that is no failure.",
    },
    {
      invariantKind: "departure",
      statement: "The remote is the one the branch tracks, or the first the checkout names.",
    },
    {
      invariantKind: "departure",
      statement: "A HEAD that is on no branch has nothing to push it as.",
    },
    {
      invariantKind: "departure",
      statement:
        "A push that fails says the write is already durable locally and only the second copy is missing.",
    },
    {
      invariantKind: "departure",
      statement: "A push that fails tells the caller not to run the command again.",
    },
  ],
} as const satisfies Module
