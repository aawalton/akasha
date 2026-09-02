import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperPlayerCompletion = {
  id: "01a06103-061c-7f39-82ee-5a83ddec0f3d",
  pageTypeSlug: "workspace-package",
  slug: "temper-player-completion",
  definition: "how much of The Elder Scrolls Online one player has finished, reckoned card by card",
  manifest: "json",
  partSlugs: [
    "module/completion-category-tree-types",
    "module/completion-category-tree",
    "module/completion-card-tab",
    "module/completion-card-registry",
    "module/completion-card-id",
    "module/completion-override",
  ],
  invariants: [
    {
      invariantKind: "constraint",
      statement: "Nothing here reaches the game.",
    },
    {
      invariantKind: "departure",
      statement: "A completion card is the unit a player is measured by.",
    },
  ],
} as const satisfies WorkspacePackage
