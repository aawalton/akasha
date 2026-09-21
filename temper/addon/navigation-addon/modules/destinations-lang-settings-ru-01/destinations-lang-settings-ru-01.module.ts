import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsRu01 = {
  id: "01a06269-2a2c-7fb9-ac17-6517ad103f3b",
  type: "page-type/module",
  slug: "destinations-lang-settings-ru-01",
  definition: "one run of the destinations settings strings in Russian",
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
