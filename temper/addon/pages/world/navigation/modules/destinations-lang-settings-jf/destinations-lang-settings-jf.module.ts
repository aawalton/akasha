import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsJf = {
  id: "01a06269-2a1d-7acc-b2d8-8693ae37d9d1",
  type: "page-type/module",
  slug: "destinations-lang-settings-jf",
  definition:
    "the destinations settings strings in Japanese with English fallbacks, joined from its sets",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is the sets joined in order.",
    },
  ],
} as const satisfies Module
