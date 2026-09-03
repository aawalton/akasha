import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const k8sNodeSelector = {
  id: "01a06810-92fe-7e01-b59b-950e7cd7e495",
  pageTypeSlug: "cluster-check",
  slug: "k8s-node-selector",
  definition:
    "the check refusing a pod picking its node by a machine's name rather than by class or capacity",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "yaml-file" },
    { nodeKind: "yml-file" },
    { nodeKind: "ts-file" },
    { nodeKind: "tsx-file" },
  ],
  treeSha: true,
} as const satisfies ClusterCheck
