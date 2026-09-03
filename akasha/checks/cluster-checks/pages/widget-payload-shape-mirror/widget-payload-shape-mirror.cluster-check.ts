import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const widgetPayloadShapeMirror = {
  id: "01a06810-9300-7ba8-aa8a-4d5be6891e58",
  pageTypeSlug: "cluster-check",
  slug: "widget-payload-shape-mirror",
  definition:
    "the check refusing a mirrored iOS widget payload missing a field its wire vocabulary names",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "swift-file", under: "akasha/code-system/ios-components/pages" }],
} as const satisfies ClusterCheck
