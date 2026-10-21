import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const characterTemplatesReading = {
  id: "01a15ead-0f2c-7bca-8c0d-2ea82c0d49fb",
  type: "page-type/module",
  slug: "character-templates-reading",
  definition: "the reading of the race, class and class mastery pages a character build takes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery names its class as the key that class's page states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A class mastery stating no effects is read as a mastery with none.",
    },
  ],
  createdAt: "2026-10-21T13:36:02.348Z",
  updatedAt: "2026-10-21T13:36:02.348Z",
} as const satisfies Module
