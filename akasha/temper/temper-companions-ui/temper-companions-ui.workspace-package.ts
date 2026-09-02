import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperCompanionsUi = {
  id: "01a06360-7480-7002-8dd6-aef232754744",
  pageTypeSlug: "workspace-package",
  slug: "temper-companions-ui",
  definition: "the companion builds a player keeps, listed, edited and shared",
  manifest: "json",
  partSlugs: ["module/companion-quality-rules", "module/use-companions"],
} as const satisfies WorkspacePackage
