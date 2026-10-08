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
      statement: "The set is the add-on's own source rather than a derivation.",
    },
  ],
  createdAt: "2026-09-02T13:57:34.339Z",
  updatedAt: "2026-09-22T14:20:22.000Z",
} as const satisfies Module
