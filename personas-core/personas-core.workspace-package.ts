import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const personasCore = {
  id: "01a05b70-a58a-73c7-b5cd-69209b172a7e",
  pageTypeSlug: "workspace-package",
  slug: "personas-core",
  definition: "what a persona is scored by, and how her images and her voice are described",
  manifest: "json",
  partSlugs: [
    "module/anchor-cover-record",
    "module/canonical-image-classify",
    "module/framework",
    "module/git-byte-pathspecs",
    "module/green-day-fraction",
    "module/image-locator",
    "module/image-name",
    "module/last-messaged",
    "module/persona-page-conditions",
    "module/points-source-availability",
    "module/points-source-coherence",
    "module/points-source-declarers",
    "module/render-prompt",
    "module/totals",
    "module/voice-spec",
    "module/wallpaper-backfill-classify",
    "module/wallpaper-backfill-execute",
    "module/wallpaper-install",
    "module/wallpaper-record",
    "module/wallpaper-select",
  ],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here touches the filesystem.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a persona's stored record.",
    },
  ],
} as const satisfies WorkspacePackage
