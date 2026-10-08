import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const destinationsLangSettingsDe02 = {
  id: "01a06269-29fe-7e13-a01e-c0806eab8847",
  type: "page-type/module",
  slug: "destinations-lang-settings-de-02",
  definition: "a set of the destinations settings strings in German",
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
  createdAt: "2026-09-02T13:57:34.334Z",
  updatedAt: "2026-09-22T14:17:06.000Z",
} as const satisfies Module
