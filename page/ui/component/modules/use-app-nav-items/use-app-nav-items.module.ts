import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const useAppNavItems = {
  id: "01a063ba-3eb6-7d77-a305-4984882f48bb",
  type: "page-type/module",
  slug: "use-app-nav-items",
  definition: "The nav items an app draws, with the acts reordering and reparenting them.",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item names the app it belongs to by page address rather than by id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A key the nav page type does not declare is refused rather than answered empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item names its parent by page address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent naming an item outside this app leaves its child at the top.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A nav item heading a bottom section is drawn at the foot, with the items under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A heading of a bottom section leads nowhere of its own.",
    },
  ],
} as const satisfies Module
