import type { PagePropertyType } from "../../../pages-system/page-property-type/page-property-type.page-type.ts"

export type RunsOnWorktree = boolean

export const runsOnWorktree = {
  id: "01a04e26-4527-7a8d-9062-39be96637164",
  pageTypeSlug: "page-property-type",
  slug: "runs-on-worktree",
  definition: "whether a check judges a set of changes at worktree",
  extendsSlug: null,
  kind: "boolean",
} as const satisfies PagePropertyType
