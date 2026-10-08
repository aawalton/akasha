import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFx = {
  id: "01a06269-2a16-72c7-a620-23f883db25ea",
  type: "page-type/module",
  slug: "destinations-lang-settings-fx",
  definition:
    "the destinations settings strings in French with English fallbacks, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.358Z",
  updatedAt: "2026-09-22T14:15:16.000Z",
} as const satisfies Module
