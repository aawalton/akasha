import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsEs01 = {
  id: "01a06269-2a08-723d-82bf-b2f8f458b235",
  type: "page-type/module",
  slug: "destinations-lang-settings-es-01",
  definition: "one run of the destinations settings strings in Spanish",
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
