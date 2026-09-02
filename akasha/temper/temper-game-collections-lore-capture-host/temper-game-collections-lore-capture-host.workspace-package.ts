import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCollectionsLoreCaptureHost = {
  id: "01a06076-5ea6-7ba2-ae39-5c3ea32e84cb",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-collections-lore-capture-host",
  definition: "the zod schema reading the lore library catalog a capture addon saved",
  manifest: "json",
  partSlugs: ["module/lore-library-catalog-schema"],
} as const satisfies WorkspacePackage
