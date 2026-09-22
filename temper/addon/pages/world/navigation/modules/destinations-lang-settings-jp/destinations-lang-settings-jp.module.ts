import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsJp = {
  id: "01a06269-2a23-7075-b788-11cea0558322",
  type: "page-type/module",
  slug: "destinations-lang-settings-jp",
  definition: "the destinations settings strings in Japanese, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the runs joined in order.",
    },
  ],
} as const satisfies Module
