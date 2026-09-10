import type { Module } from "@akasha/code/module"

export const useAppNavItems = {
  id: "01a063ba-3eb6-7d77-a305-4984882f48bb",
  pageTypeSlug: "module",
  type: "module",
  slug: "use-app-nav-items",
  definition: "The nav items an app draws, with the acts reordering and reparenting them.",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A nav item names the app it belongs to by slug rather than by id.",
    },
    {
      invariantKind: "departure",
      statement: "A key the nav page type does not declare is refused rather than answered empty.",
    },
    {
      invariantKind: "departure",
      statement: "A nav item names its parent by slug, resolved against the items loaded here.",
    },
    {
      invariantKind: "departure",
      statement: "A parent naming an item outside this app leaves its child at the top.",
    },
  ],
} as const satisfies Module
