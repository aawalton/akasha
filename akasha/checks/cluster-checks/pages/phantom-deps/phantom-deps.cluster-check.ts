import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const phantomDeps = {
  id: "01a06810-92ff-758f-8e78-83da3a5b6dfd",
  pageTypeSlug: "cluster-check",
  slug: "phantom-deps",
  definition:
    "the check refusing a package a workspace's source imports that its manifest does not declare",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }, { nodeKind: "package" }],
  alwaysRun: true,
  treeSha: true,
} as const satisfies ClusterCheck
