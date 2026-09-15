import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitPushing = {
  id: "01a068ae-fd9c-7003-9693-a93bade6fb89",
  type: "module",
  slug: "git-pushing",
  definition:
    "the branch pushed to the remote it tracks, saying plainly what a failure did and did not cost",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A checkout with no remote has nothing to push to and a missing remote is no failure.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The remote is the remote the branch tracks or the first remote the checkout names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A HEAD that is on no branch has nothing to push that HEAD as.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A push that fails says the write is already durable locally and only the second copy is missing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push that fails tells the caller not to run the command again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A push is given the time carrying objects takes rather than the time a query takes.",
    },
  ],
} as const satisfies Module
