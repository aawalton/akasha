import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const temperHudWindow = {
  id: "01a060c4-17cf-71ca-8cd3-af5a3fa3c40d",
  pageTypeSlug: "workspace-package",
  slug: "temper-hud-window",
  definition: "an addon window a player drags around the screen",
  manifest: "json",
  partSlugs: ["module/movable-window"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A window here is drawn by the game rather than by the browser.",
    },
    {
      invariantKind: "departure",
      statement: "Where a window is kept is the caller's concern rather than this package's.",
    },
  ],
} as const satisfies WorkspacePackage
