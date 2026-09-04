import type { BooleanProperty } from "@akasha/pages-system/boolean-property"

export type TreeSha = boolean

export const treeSha = {
  id: "01a0680b-1003-71bf-9a55-e505a27ae519",
  pageTypeSlug: "boolean-property",
  slug: "tree-sha",
  propertySlug: "tree-sha",
  definition: "whether a check's answer is kept against the tree it was taken over",
} as const satisfies BooleanProperty
