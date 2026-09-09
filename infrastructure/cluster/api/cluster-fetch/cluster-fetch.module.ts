import type { Module } from "@akasha/code/module"

export const clusterFetch = {
  id: "01a068d4-d2aa-7902-bb36-12d037d7ac6b",
  pageTypeSlug: "module",
  type: "module",
  slug: "cluster-fetch",
  definition: "one call to the cluster's API server, with the credential the environment holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The credential and the API address are read from the environment once and kept.",
    },
    {
      invariantKind: "departure",
      statement: "A call giving no answer within the ceiling is aborted.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refusal names the call and the HTTP code and whatever body came back with that code.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
