import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const checksumAnnotationSubstitution = {
  id: "01a06810-92fd-79db-97f4-e58ecd946de5",
  pageTypeSlug: "cluster-check",
  slug: "checksum-annotation-substitution",
  definition:
    "the check refusing a constant checksum pod annotation with no substitution site behind it",
  code: "ts",
  alwaysRun: true,
} as const satisfies ClusterCheck
