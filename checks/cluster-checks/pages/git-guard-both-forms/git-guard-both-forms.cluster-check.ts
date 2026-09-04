import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const gitGuardBothForms = {
  id: "01a06810-92fe-7d61-9445-583ca0dc4d64",
  pageTypeSlug: "cluster-check",
  slug: "git-guard-both-forms",
  definition: "the check refusing a .git guard that takes a directory alone",
  code: "ts",
  alwaysRun: true,
} as const satisfies ClusterCheck
