import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsJf01 = {
  id: "01a06269-2a1b-77d2-acb3-d0a410ababcb",
  type: "page-type/module",
  slug: "destinations-lang-settings-jf-01",
  definition: "a run of the destinations settings strings in Japanese with English fallbacks",
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
