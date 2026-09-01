import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const designBadges = {
  id: "01a05b55-a539-766c-98d3-a4d3e2fc6c4b",
  pageTypeSlug: "workspace-package",
  slug: "design-badges",
  definition: "the badges a browser draws a short value in",
  manifest: "json",
  partSlugs: [
    "module/badge",
    "module/badge-layout-context",
    "module/badge-toggle-group",
    "module/button-badge",
    "module/checkbox-badge",
    "module/date-badge",
    "module/empty-badge",
    "module/input-badge",
    "module/instant-badge",
    "module/json-badge",
    "module/link-badge",
    "module/number-badge",
    "module/time-badge",
    "module/url-badge",
  ],
} as const satisfies WorkspacePackage
