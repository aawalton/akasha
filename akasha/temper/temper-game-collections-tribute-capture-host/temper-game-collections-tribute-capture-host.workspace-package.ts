import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperGameCollectionsTributeCaptureHost = {
  id: "01a06076-5ea7-7ffe-b49e-e455c966f7b7",
  pageTypeSlug: "workspace-package",
  slug: "temper-game-collections-tribute-capture-host",
  definition: "the zod schema reading the tribute patron catalog a capture addon saved",
  manifest: "json",
  partSlugs: ["module/tribute-catalog-schema"],
} as const satisfies WorkspacePackage
