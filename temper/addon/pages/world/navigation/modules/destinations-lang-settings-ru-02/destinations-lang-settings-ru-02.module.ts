import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsRu02 = {
  id: "01a06269-2a2d-79ea-8582-1d0694600244",
  type: "page-type/module",
  slug: "destinations-lang-settings-ru-02",
  definition: "a set of the destinations settings strings in Russian",
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
