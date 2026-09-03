import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const unusedDeps = {
  id: "01a06810-9300-79c9-bcbf-c53b6f93a578",
  pageTypeSlug: "cluster-check",
  slug: "unused-deps",
  definition: "the check refusing a dependency a workspace declares and uses nowhere",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "ts-file" },
    { nodeKind: "tsx-file" },
    { nodeKind: "yaml-file" },
    { nodeKind: "yml-file" },
    { nodeKind: "package" },
    { nodeKind: "css-file" },
    { nodeKind: "sh-file" },
    { nodeKind: "dockerfile-file" },
    { nodeKind: "json-file" },
    { nodeKind: "lockfile-package" },
    { nodeKind: "lock-file" },
  ],
  treeSha: true,
  resources: { requestCpu: "1500m", limitMemory: "2Gi" },
} as const satisfies ClusterCheck
