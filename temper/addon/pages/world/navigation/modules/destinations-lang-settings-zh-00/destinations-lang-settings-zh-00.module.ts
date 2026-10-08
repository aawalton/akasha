import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsZh00 = {
  id: "01a06269-2a30-7dc9-99dd-02dd9583dbbe",
  type: "page-type/module",
  slug: "destinations-lang-settings-zh-00",
  definition: "a set of the destinations settings strings in Chinese",
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
  createdAt: "2026-09-02T13:57:34.384Z",
  updatedAt: "2026-09-22T14:20:22.000Z",
} as const satisfies Module
