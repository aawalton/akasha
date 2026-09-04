import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const envUnsetBash = {
  id: "01a06810-92fe-793e-908a-0fcf0d9e3ea2",
  pageTypeSlug: "cluster-check",
  slug: "env-unset-bash",
  definition: "the check refusing an env -u call that leaves BASH_ENV standing",
  code: "ts",
  alwaysRun: true,
} as const satisfies ClusterCheck
