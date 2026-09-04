import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const fileSystem = {
  id: "01a05231-61c5-775c-a479-ffa46b4fe6bc",
  pageTypeSlug: "workspace-package",
  slug: "file-system",
  definition: "where akasha keeps what git does not track, and how processes take turns over it",
  manifest: "json",
  partSlugs: [
    "module/answer-keeping",
    "module/answer-mark",
    "module/data-place",
    "module/exclusive",
    "module/lock-holder",
    "module/lock-holder-runs",
  ],
} as const satisfies WorkspacePackage
