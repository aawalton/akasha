import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const alanwaltonWeb = {
  id: "01a05bb1-0c04-751f-8f51-baadbd134cf6",
  pageTypeSlug: "workspace-package",
  slug: "alanwalton-web",
  definition: "the code Alan's site is built from",
  manifest: "json",
  partSlugs: [
    "module/chess-board",
    "module/chess-eval",
    "module/chess-eval-bar",
    "module/chess-move-list",
    "module/chess-state",
    "stylesheet/chess-board-look",
    "module/declared-effects",
  ],
} as const satisfies WorkspacePackage
