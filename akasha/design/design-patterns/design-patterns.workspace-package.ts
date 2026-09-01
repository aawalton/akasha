import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const designPatterns = {
  id: "01a05c51-8287-7dba-82e4-64786876e805",
  pageTypeSlug: "workspace-package",
  slug: "design-patterns",
  definition: "the recurring pieces a list, a card and a toolbar are built from",
  manifest: "json",
  partSlugs: [
    "module/back-button",
    "module/build-values-from-fields",
    "module/button-group",
    "module/chip",
    "module/chip-list",
    "module/empty",
    "module/group-utils",
    "module/input-panel-card",
    "module/item",
    "module/kbd",
    "module/log-viewer",
    "module/lucide-icon",
    "module/path",
    "module/sort-group-helpers",
    "module/sort-types",
    "module/use-scroll-restoration",
  ],
} as const satisfies WorkspacePackage
