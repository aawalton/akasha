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
    "module/chrome-toggle-decider",
    "module/drop-zones",
    "module/flat-query-args",
    "module/is-webkit",
    "module/media-renditions",
    "module/media-src",
    "module/media-token",
    "module/page-board-dnd-helpers",
    "module/page-calendar-dnd-helpers",
    "module/page-display-registry",
    "module/position-fraction",
    "module/resolve-active-sentence",
    "module/use-app-version-check",
    "module/use-shell-media-src",
  ],
} as const satisfies WorkspacePackage
