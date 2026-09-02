import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCollectionsAntiquitiesCaptureHost = {
  id: "01a06076-5ea4-7e2d-b765-5f834fb20819",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-collections-antiquities-capture-host",
  definition: "the zod schema reading the antiquity lore catalog a capture addon saved",
  manifest: "json",
  partSlugs: ["module/antiquity-lore-catalog-schema"],
} as const satisfies WorkspacePackage
