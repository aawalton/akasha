import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const ciBenchmark = {
  id: "01a0675b-16d8-704b-a679-f300bf41cd88",
  pageTypeSlug: "domain",
  slug: "ci-benchmark",
  definition: "one CI node's substrate measured against the whole check registry on a cold store",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The pod is placed by a hostname nodeSelector rather than by a node name.",
    },
    {
      invariantKind: "departure",
      statement: "A pod the kubelet rejects is a destroyed run rather than a retried one.",
    },
    {
      invariantKind: "departure",
      statement: "The store is empty at the start of every run, and independent of the node.",
    },
    {
      invariantKind: "departure",
      statement: "Two runs are comparable only where their failures match on name and exit code.",
    },
    {
      invariantKind: "departure",
      statement: "A failure outside the declared set invalidates the run rather than failing it.",
    },
    {
      invariantKind: "departure",
      statement: "The memory request covers the tmpfs size limit as well as the working set.",
    },
  ],
} as const satisfies Domain
