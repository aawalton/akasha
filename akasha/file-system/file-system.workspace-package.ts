import type { WorkspacePackage } from "../code-system/workspace-package/workspace-package.page-type.ts"

export const fileSystem = {
  id: "01a05231-61c5-775c-a479-ffa46b4fe6bc",
  pageTypeSlug: "workspace-package",
  slug: "file-system",
  definition: "where akasha keeps what git does not track, and how processes take turns over it",
  manifest: "json",
  partSlugs: ["module/data-place", "module/lock-holder"],
} as const satisfies WorkspacePackage
