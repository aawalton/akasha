import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const personasCore = {
  id: "01a05b70-a58a-73c7-b5cd-69209b172a7e",
  pageTypeSlug: "workspace-package",
  slug: "personas-core",
  definition: "what a persona is scored by, and how her images and her voice are described",
  manifest: "json",
  partSlugs: ["module/desktop-wallpaper-setting", "workstation-service/desktop-wallpaper-setting"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a persona's stored record.",
    },
  ],
} as const satisfies WorkspacePackage
