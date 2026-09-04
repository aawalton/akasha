import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const clientPageAccessBoundary = {
  id: "01a06810-92fe-7c05-bc43-a66913324d38",
  pageTypeSlug: "cluster-check",
  slug: "client-page-access-boundary",
  definition:
    "the check refusing a client file reaching the pages table outside the shared pages-ui hooks",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
} as const satisfies ClusterCheck
