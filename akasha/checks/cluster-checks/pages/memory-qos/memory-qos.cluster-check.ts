import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const memoryQos = {
  id: "01a06810-92ff-7b24-b405-934907cfc67a",
  pageTypeSlug: "cluster-check",
  slug: "memory-qos",
  definition:
    "the check refusing a container whose memory request and limit are not the same value",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "yaml-file" },
    { nodeKind: "yml-file" },
    { nodeKind: "workflow" },
  ],
  treeSha: true,
} as const satisfies ClusterCheck
