import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const tabIcon = {
  id: "01a0e3a2-6e73-7710-88e2-713cf6eb205f",
  type: "page-type/module",
  slug: "tab-icon",
  definition: "how code chooses the icon a browser tab shows for its page",
  code: "tsx",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A document names one tab icon and no other.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A browser shown two tab icons may keep the one it knew before rather than the last named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A nav page's tab icon is the icon its nav page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other page's tab icon is the icon that page is drawn with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page drawn with no icon of its own has the site's icon as its tab icon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The deepest route naming an icon names the tab icon.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An icon a drawn page shows live names the tab icon over what any route loaded.",
    },
  ],
  createdAt: "2026-09-27T16:11:08.275Z",
  updatedAt: "2026-10-30T17:04:43.339Z",
} as const satisfies Module
