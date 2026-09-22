import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsJp02 = {
  id: "01a06269-2a22-75d0-b2a1-543992df40fe",
  type: "page-type/module",
  slug: "destinations-lang-settings-jp-02",
  definition: "a set of the destinations settings strings in Japanese",
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
