import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const repoPaths = {
  id: "01a06810-92ff-7b07-a57f-323cbec7b849",
  pageTypeSlug: "cluster-check",
  slug: "repo-paths",
  definition:
    "the check refusing a repo path written in source or a link that points at no tracked file",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "md-file" }],
  alwaysRun: true,
} as const satisfies ClusterCheck
