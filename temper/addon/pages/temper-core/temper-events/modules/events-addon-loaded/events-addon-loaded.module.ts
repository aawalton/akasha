import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const eventsAddonLoaded = {
  id: "01a06157-835a-79f6-9dfd-17774a525329",
  type: "page-type/module",
  slug: "events-addon-loaded",
  definition: "what starts once the game says this add-on has loaded",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every timer this add-on holds is started from here.",
    },
  ],
  createdAt: "2026-09-02T08:58:40.346Z",
  updatedAt: "2026-09-22T05:50:40.000Z",
} as const satisfies Module
