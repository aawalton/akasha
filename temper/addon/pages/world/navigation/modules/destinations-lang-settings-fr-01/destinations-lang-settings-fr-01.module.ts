import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFr01 = {
  id: "01a06269-2a0e-75d4-93d4-a643ea642a86",
  type: "page-type/module",
  slug: "destinations-lang-settings-fr-01",
  definition: "a set of the destinations settings strings in French",
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
} as const satisfies Module
