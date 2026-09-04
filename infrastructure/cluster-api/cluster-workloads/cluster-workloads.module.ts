import type { Module } from "@akasha/code-system/module"

export const clusterWorkloads = {
  id: "01a068d4-d2aa-78c1-b2b4-0a455b38278d",
  pageTypeSlug: "module",
  slug: "cluster-workloads",
  definition: "the deployments, services, pods and statefulsets one namespace holds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A delete of what is already gone is answered as no delete rather than as a fault.",
    },
    {
      invariantKind: "departure",
      statement: "A create meeting a name already taken is answered as already there.",
    },
    {
      invariantKind: "departure",
      statement: "A restart is an annotation written onto the deployment's pod template.",
    },
    {
      invariantKind: "departure",
      statement:
        "Waiting on a rollout ends when one replica is available or the ceiling is reached.",
    },
  ],
} as const satisfies Module
