import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsFx00 = {
  id: "01a06269-2a12-727c-bae3-72f0eaf91c62",
  type: "page-type/module",
  slug: "destinations-lang-settings-fx-00",
  definition: "a set of the destinations settings strings in French with English fallbacks",
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
