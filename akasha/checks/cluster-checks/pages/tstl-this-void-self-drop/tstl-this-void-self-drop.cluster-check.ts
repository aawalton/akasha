import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const tstlThisVoidSelfDrop = {
  id: "01a06810-9300-769b-bafb-c6ebe8fc0073",
  pageTypeSlug: "cluster-check",
  slug: "tstl-this-void-self-drop",
  definition: "the check refusing a colon-called addon member whose sole parameter is this: void",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file", under: "temper" }],
} as const satisfies ClusterCheck
