import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameNavigationCaptureHost = {
  id: "01a06084-d418-72e5-b162-3bb5b84f91b3",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-navigation-capture-host",
  definition: "the zod schema reading the points of interest catalog a capture addon saved",
  manifest: "json",
  partSlugs: ["module/poi-catalog-schema"],
} as const satisfies WorkspacePackage
