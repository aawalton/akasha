import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const clientEnvInlined = {
  id: "01a06810-92fe-7142-9a01-eba32fe8b603",
  pageTypeSlug: "cluster-check",
  slug: "client-env-inlined",
  definition: "the check refusing a client NEXT_PUBLIC read no vite define can replace",
  code: "ts",
} as const satisfies ClusterCheck
