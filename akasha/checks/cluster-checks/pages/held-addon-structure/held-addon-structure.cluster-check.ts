import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const heldAddonStructure = {
  id: "01a06810-92fe-703f-8106-96fa844cddf5",
  pageTypeSlug: "cluster-check",
  slug: "held-addon-structure",
  definition: "the check refusing a territory map entry naming an addon the roster finds nowhere",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "temper" }],
} as const satisfies ClusterCheck
