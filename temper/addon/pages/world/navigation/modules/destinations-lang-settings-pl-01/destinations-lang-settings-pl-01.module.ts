import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsPl01 = {
  id: "01a06269-2a26-7731-86ca-f01e38150809",
  type: "page-type/module",
  slug: "destinations-lang-settings-pl-01",
  definition: "a run of the destinations settings strings in Polish",
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
