import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const noOrphanSource = {
  id: "01a06810-92ff-71a9-bf5f-b07f438a6e39",
  pageTypeSlug: "cluster-check",
  slug: "no-orphan-source",
  definition: "the check refusing a source file under packages that sits in no workspace package",
  code: "ts",
  alwaysRun: true,
} as const satisfies ClusterCheck
