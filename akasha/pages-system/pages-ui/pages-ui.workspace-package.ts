import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const pagesUi = {
  id: "01a05c0f-884e-7019-b4e6-08b3faac2e0b",
  pageTypeSlug: "workspace-package",
  slug: "pages-ui",
  definition: "what draws pages in a browser and takes what a reader does to them",
  manifest: "json",
  partSlugs: [
    "module/app-version-check",
    "module/capability-hosts",
    "module/page-display-registry",
    "module/use-app-version-check",
  ],
} as const satisfies WorkspacePackage
