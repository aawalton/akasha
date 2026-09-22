import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsJp01 = {
  id: "01a06269-2a21-7e39-a57e-bae183cd3a5a",
  type: "page-type/module",
  slug: "destinations-lang-settings-jp-01",
  definition: "a set of the destinations settings strings in Japanese",
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
