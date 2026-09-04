import type { Module } from "@akasha/code-system/module"

export const ciDispatchCluster = {
  id: "01a06861-24c9-7005-852e-405a81b983c1",
  pageTypeSlug: "module",
  slug: "ci-dispatch-cluster",
  definition: "the cluster the dispatcher creates step containers on",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A call the cluster does not answer inside the ceiling fails rather than being waited on.",
    },
    {
      invariantKind: "departure",
      statement:
        "A status the cluster would repeat is persistent, and every other status is transient.",
    },
  ],
} as const satisfies Module
