import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFr = {
  id: "01a06269-2a10-78f6-84dd-4bdeb018225f",
  type: "page-type/module",
  slug: "destinations-lang-settings-fr",
  definition: "the destinations settings strings in French, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
