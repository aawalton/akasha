import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCollectionsCaptureHost = {
  id: "01a06076-5ea5-7a03-a52d-9fe1c4a03a89",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-collections-capture-host",
  definition: "the zod schema reading the collectibles catalog a capture addon saved",
  manifest: "json",
  partSlugs: ["module/collectibles-catalog-schema"],
} as const satisfies WorkspacePackage
