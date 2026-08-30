import type { BooleanProperty } from "../../../pages-system/boolean-property/boolean-property.page-type.ts"

export type RunsOnWorktree = boolean

export const runsOnWorktree = {
  id: "01a04e26-4527-7a8d-9062-39be96637164",
  pageTypeSlug: "boolean-property",
  slug: "runs-on-worktree",
  propertySlug: "runs-on-worktree",
  definition: "whether a check judges a set of changes at worktree",
} as const satisfies BooleanProperty
