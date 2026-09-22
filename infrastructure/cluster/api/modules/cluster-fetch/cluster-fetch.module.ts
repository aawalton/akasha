import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterFetch = {
  id: "01a068d4-d2aa-7902-bb36-12d037d7ac6b",
  type: "page-type/module",
  slug: "cluster-fetch",
  definition: "a call to the cluster's API server, with the credential the environment holds",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The credential and the API address are read from the environment once and kept.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call giving no answer within the ceiling is aborted.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal names the call and the HTTP code and whatever body came back with that code.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads or writes a file.",
    },
  ],
} as const satisfies Module
