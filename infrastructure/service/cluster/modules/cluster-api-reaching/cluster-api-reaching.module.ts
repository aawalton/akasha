import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const clusterApiReaching = {
  id: "01a06583-0030-7000-94b8-9fa8780482f5",
  type: "module",
  slug: "cluster-api-reaching",
  definition: "a service behind the Kubernetes API proxy, reached with a service account token",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every value a reach needs is read from the environment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An environment missing a value a reach needs is a caller's mistake.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The environment is read once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values the environment gave are held for the life of the process.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reach still open after thirty seconds is abandoned.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads the answer a reach gave.",
    },
  ],
} as const satisfies Module
