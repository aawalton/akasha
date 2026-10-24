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
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav item at the foot with no items under it is drawn as a link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The nav items at the top are drawn in the order of their titles.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nav items the server serves are drawn as served, and none is asked for again.",
    },
  ],
  createdAt: "2026-09-02T20:05:45.270Z",
  updatedAt: "2026-10-24T21:46:24.050Z",
} as const satisfies Module
