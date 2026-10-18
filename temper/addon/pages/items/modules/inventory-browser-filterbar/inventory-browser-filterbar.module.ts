import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const inventoryBrowserFilterbar = {
  id: "01a06258-b529-7a93-8a15-c32cbdacd6ba",
  type: "page-type/module",
  slug: "inventory-browser-filterbar",
  definition:
    "the search, quality, category and location controls above the cross-character browser",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A category, subfilter, sort or search mode is a bare text choice.",
    },
  ],
  createdAt: "2026-09-02T13:39:35.849Z",
  updatedAt: "2026-10-18T19:08:52.865Z",
} as const satisfies Module
