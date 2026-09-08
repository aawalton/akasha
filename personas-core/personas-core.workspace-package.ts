import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const personasCore = {
  id: "01a05b70-a58a-73c7-b5cd-69209b172a7e",
  pageTypeSlug: "workspace-package",
  slug: "personas-core",
  definition: "what a persona is scored by, and how her images and her voice are described",
  manifest: "json",
  partSlugs: [
    "module/canonical-image-classify",
    "module/desktop-wallpaper-setting",
    "module/framework",
    "module/git-byte-pathspecs",
    "module/green-day-fraction",
    "module/last-messaged",
    "module/points-source-availability",
    "module/points-source-declarers",
    "module/render-prompt",
    "module/wallpaper-backfill-classify",
    "module/wallpaper-backfill-execute",
    "module/wallpaper-install",
    "module/wallpaper-order",
    "module/wallpaper-select",
    "workstation-service/desktop-wallpaper-setting",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a persona's stored record.",
    },
  ],
} as const satisfies WorkspacePackage
