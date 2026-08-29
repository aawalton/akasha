import type { InvariantKind } from "./invariant-kind.page-type.ts"

export const upkeep = {
  id: "01a04e11-9f98-7fc1-9a75-cc49b4124ad8",
  pageTypeSlug: "invariant-kind",
  slug: "upkeep",
  definition: "a state kept by hand because nothing could be built to hold it",
  groupSlug: "invariant-group/condition",
} as const satisfies InvariantKind
