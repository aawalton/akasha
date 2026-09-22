import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsEn02 = {
  id: "01a06269-2a03-72a9-92ff-fd43809772c0",
  type: "page-type/module",
  slug: "destinations-lang-settings-en-02",
  definition: "a set of the destinations settings strings in English",
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
