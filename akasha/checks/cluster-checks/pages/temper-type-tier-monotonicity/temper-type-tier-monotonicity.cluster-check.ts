import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const temperTypeTierMonotonicity = {
  id: "01a06810-9300-7149-98f8-dae41b8072ac",
  pageTypeSlug: "cluster-check",
  slug: "temper-type-tier-monotonicity",
  definition: "the check refusing a Temper package depending on a tier above its own",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "json-file", under: "temper" }],
  treeSha: true,
} as const satisfies ClusterCheck
