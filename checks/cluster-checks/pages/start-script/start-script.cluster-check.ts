import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const startScript = {
  id: "01a06810-9300-7048-89b6-0409c103465b",
  pageTypeSlug: "cluster-check",
  slug: "start-script",
  definition:
    "the check refusing a container declared to run start in a workspace holding no start script",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "package" }],
} as const satisfies ClusterCheck
