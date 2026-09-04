import type { ClusterCheck } from "../../cluster-check.page-type.ts"

export const appIntentBrandWords = {
  id: "01a06810-92fd-71f8-9641-0c79c085a8ca",
  pageTypeSlug: "cluster-check",
  slug: "app-intent-brand-words",
  definition: "the check refusing an App Intent whose wording carries the word apple",
  code: "ts",
  dispatchNodeTypes: [{ nodeKind: "sh-file" }],
} as const satisfies ClusterCheck
