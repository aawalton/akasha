import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const orchestratorCache = {
  id: "01a06735-dd9c-7008-984b-4026a047dce8",
  type: "page-type/module",
  slug: "orchestrator-cache",
  definition: "the init containers and sidecar filling a web app's checkout and its build",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The checkout is fetched and reset hard to the commit deployed at every pod start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit deployed is read from the tree this code is composed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tree written out at a commit states that commit, and the pod is given it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Reading the head of the folder this code sits in would name a commit a landing moved past.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod fetches from origin, so a commit only a deploy holds would leave it stuck.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Code composed outside such a tree falls back to the head of the folder it sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A commit that cannot be read refuses the manifest rather than naming a branch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod restarting without a deploy comes back at the same commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file written into that checkout inside the pod goes at the next pod start.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A writer in the pod that must keep what it writes reaches the pages service over HTTP.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pod builds where the build beside the server is of another commit than the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod builds where the build beside the server names no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod whose build is of the checkout's commit starts on that build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pod builds as a web app's deploy builds, and the build names its commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every checkout and every build on a cache is made holding the cache's one lock.",
    },
  ],
} as const satisfies Module
