import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsDe00 = {
  id: "01a06269-29fb-7e0e-b911-e60ba6d53708",
  type: "page-type/module",
  slug: "destinations-lang-settings-de-00",
  definition: "a set of the destinations settings strings in German",
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
