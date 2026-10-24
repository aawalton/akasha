import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appLayoutLoading = {
  id: "01a0655e-d39b-7415-b913-3146ff8bfa28",
  type: "page-type/module",
  slug: "app-layout-loading",
  definition: "what the signed-in layout loads before it is drawn",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The layout loads the nav items rather than the shell fetching those items first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sidebar is drawn on the first frame rather than after hydration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The layout loads the name the site is shown under off its web app page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A signed-in reader's site is shown under the first proper noun that reader's person page spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reader signed out, or whose person page spells no proper noun, is shown the web app page's name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tab title names the site rather than the reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The layout loads only the nav items the reader's access reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who reads none of the app's nav pages is drawn the items as loaded.",
    },
  ],
  createdAt: "2026-09-03T03:45:08.507Z",
  updatedAt: "2026-10-24T23:08:38.639Z",
} as const satisfies Module
