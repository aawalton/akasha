import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const shellcheck = {
  id: "01a06810-9300-7d62-b483-c3aa83b77d6a",
  pageTypeSlug: "cluster-check",
  slug: "shellcheck",
  definition: "the check refusing a shell script shellcheck finds fault in",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "sh-file" }],
  image: "debian:bookworm-slim",
} as const satisfies ClusterCheck
