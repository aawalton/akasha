import type { Module } from "@akasha/code-system/module"

export const clusterApiReaching = {
  id: "01a06583-0030-7000-94b8-9fa8780482f5",
  pageTypeSlug: "module",
  slug: "cluster-api-reaching",
  definition: "the Kubernetes API reached with a service account token, directly or by proxy",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every value a reach needs is read from the environment.",
    },
    {
      invariantKind: "departure",
      statement: "An environment missing what a reach needs is a caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "The environment is read once.",
    },
    {
      invariantKind: "departure",
      statement: "What the environment gave is held for the life of the process.",
    },
    {
      invariantKind: "departure",
      statement: "A reach still open after thirty seconds is abandoned.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads what a reach answered.",
    },
  ],
} as const satisfies Module
