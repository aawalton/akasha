import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFr02 = {
  id: "01a06269-2a0f-7c14-bc67-03923def06d3",
  type: "page-type/module",
  slug: "destinations-lang-settings-fr-02",
  definition: "a run of the destinations settings strings in French",
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
