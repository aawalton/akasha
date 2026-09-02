import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const alanWeb = {
  id: "01a05bb1-0c04-751f-8f51-baadbd134cf6",
  pageTypeSlug: "workspace-package",
  slug: "alan-web",
  definition: "the code Alan's site is built from",
  manifest: "json",
  partSlugs: ["module/declared-effects"],
} as const satisfies WorkspacePackage
