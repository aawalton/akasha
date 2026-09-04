import type { Module } from "@akasha/code-system/module"

export const clusterApiFetch = {
  id: "01a068d4-d2aa-7902-bb36-12d037d7ac6b",
  pageTypeSlug: "module",
  slug: "cluster-api-fetch",
  definition: "one call to the cluster's API server, carrying the credential the environment holds",
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
      statement: "A refusal names the call, the HTTP code and whatever body came back with it.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
