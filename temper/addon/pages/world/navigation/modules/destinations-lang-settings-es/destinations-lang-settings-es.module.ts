import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsEs = {
  id: "01a06269-2a0a-7f11-aece-8c8c65acfad1",
  type: "page-type/module",
  slug: "destinations-lang-settings-es",
  definition: "the destinations settings strings in Spanish, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.346Z",
  updatedAt: "2026-09-22T14:19:07.000Z",
} as const satisfies Module
