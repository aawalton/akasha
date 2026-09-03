import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const imageTags = {
  id: "01a06810-92fe-744d-813a-3804ee3231a3",
  pageTypeSlug: "cluster-check",
  slug: "image-tags",
  definition: "the check refusing a container image carrying neither a tag nor a digest",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "yaml-file" },
    { nodeKind: "yml-file" },
    { nodeKind: "dockerfile-file" },
    { nodeKind: "workflow" },
  ],
  treeSha: true,
} as const satisfies ClusterCheck
