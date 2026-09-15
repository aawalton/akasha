import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitPushing = {
  id: "01a068ae-fd9c-7003-9693-a93bade6fb89",
  type: "page-type/module",
  slug: "git-pushing",
  definition:
    "the branch pushed to the remote it tracks, saying plainly what a failure did and did not cost",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A checkout with no remote has nothing to push to and a missing remote is no failure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The remote is the remote the branch tracks or the first remote the checkout names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A HEAD that is on no branch has nothing to push that HEAD as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A push that fails says the write is already durable locally and only the second copy is missing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails tells the caller not to run the command again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A push is given the time carrying objects takes rather than the time a query takes.",
    },
  ],
} as const satisfies Module
