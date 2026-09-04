import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesUrl = {
  id: "01a05c13-a25f-72e2-bc3a-a48eec764e2f",
  pageTypeSlug: "workspace-package",
  slug: "pages-url",
  definition: "the addresses a browser reaches pages at, and the ones a reader may be sent to",
  manifest: "json",
  partSlugs: [
    "module/page-type-slug",
    "module/page-href",
    "module/page-listing-href",
    "module/page-display-mode",
    "module/safe-target",
    "module/cover-url",
  ],
} as const satisfies WorkspacePackage
