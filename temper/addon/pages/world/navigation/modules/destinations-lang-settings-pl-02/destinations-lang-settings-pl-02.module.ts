import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsPl02 = {
  id: "01a06269-2a27-7939-8ba6-336e54a3e802",
  type: "page-type/module",
  slug: "destinations-lang-settings-pl-02",
  definition: "a set of the destinations settings strings in Polish",
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
