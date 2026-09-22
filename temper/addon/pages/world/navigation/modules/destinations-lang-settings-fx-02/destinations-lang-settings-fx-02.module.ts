import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFx02 = {
  id: "01a06269-2a15-7bec-a615-957ea99a2c0b",
  type: "page-type/module",
  slug: "destinations-lang-settings-fx-02",
  definition: "one run of the destinations settings strings in French with English fallbacks",
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
