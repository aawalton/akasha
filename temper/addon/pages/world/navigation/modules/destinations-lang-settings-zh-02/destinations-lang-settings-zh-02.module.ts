import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsZh02 = {
  id: "01a06269-2a33-7bca-9ec1-ace32e5e3b94",
  type: "page-type/module",
  slug: "destinations-lang-settings-zh-02",
  definition: "a run of the destinations settings strings in Chinese",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "The records here are one unbroken run of the table's order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The run is the add-on's own source rather than a derivation.",
    },
  ],
} as const satisfies Module
