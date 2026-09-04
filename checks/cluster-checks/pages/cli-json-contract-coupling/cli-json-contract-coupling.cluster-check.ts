import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const cliJsonContractCoupling = {
  id: "01a06810-92fd-7326-842e-bef5165300aa",
  pageTypeSlug: "cluster-check",
  slug: "cli-json-contract-coupling",
  definition:
    "the check refusing a contract schema a test reads that is not typed against its producer",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
} as const satisfies ClusterCheck
