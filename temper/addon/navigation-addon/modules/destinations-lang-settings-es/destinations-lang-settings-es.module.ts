import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsEs = {
  id: "01a06269-2a0a-7f11-aece-8c8c65acfad1",
  type: "page-type/module",
  slug: "destinations-lang-settings-es",
  definition: "the destinations settings strings in Spanish, joined from its runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
