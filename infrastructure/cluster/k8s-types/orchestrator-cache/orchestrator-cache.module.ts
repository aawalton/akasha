import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const orchestratorCache = {
  id: "01a06735-dd9c-7008-984b-4026a047dce8",
  type: "module",
  slug: "orchestrator-cache",
  definition: "the init containers and sidecar filling a web app's checkout",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The checkout is fetched and reset hard to `origin/main` at every pod start.",
    },
    {
      invariantKind: "departure",
      statement: "A file written into that checkout inside the pod goes at the next pod start.",
    },
    {
      invariantKind: "departure",
      statement:
        "A writer in the pod that must keep what it writes reaches the pages service over HTTP.",
    },
  ],
} as const satisfies Module
