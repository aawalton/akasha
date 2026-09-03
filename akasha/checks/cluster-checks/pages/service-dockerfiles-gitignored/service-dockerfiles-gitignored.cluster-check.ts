import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const serviceDockerfilesGitignored = {
  id: "01a06810-92ff-7200-a970-c4d5e7651c74",
  pageTypeSlug: "cluster-check",
  slug: "service-dockerfiles-gitignored",
  definition:
    "the check refusing a generated service Dockerfile path git tracks or gitignore leaves uncovered",
  code: "ts",
  dispatchNodeTypes: [
    { nodeKind: "package" },
    { nodeKind: "json-file" },
    { nodeKind: "dockerfile-file" },
  ],
  alwaysRun: true,
} as const satisfies ClusterCheck
