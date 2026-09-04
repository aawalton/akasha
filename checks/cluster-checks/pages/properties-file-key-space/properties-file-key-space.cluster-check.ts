import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const propertiesFileKeySpace = {
  id: "01a06810-92ff-72b1-b76b-bfded9d14181",
  pageTypeSlug: "cluster-check",
  slug: "properties-file-key-space",
  definition:
    "the check refusing a properties file key map written with propertyId rather than propertySlug",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "ts-file" }, { nodeKind: "tsx-file" }],
} as const satisfies ClusterCheck
