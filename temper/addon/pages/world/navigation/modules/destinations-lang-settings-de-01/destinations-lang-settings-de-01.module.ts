import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsDe01 = {
  id: "01a06269-29fd-7c1a-8662-200de080b4c9",
  type: "page-type/module",
  slug: "destinations-lang-settings-de-01",
  definition: "a set of the destinations settings strings in German",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The set is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.333Z",
  updatedAt: "2026-09-22T14:15:16.000Z",
} as const satisfies Module
