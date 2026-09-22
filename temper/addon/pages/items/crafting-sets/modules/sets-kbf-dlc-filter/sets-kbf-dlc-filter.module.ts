import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const setsKbfDlcFilter = {
  id: "01a0623e-53a1-7955-ac07-165fbac5661b",
  type: "page-type/module",
  slug: "sets-kbf-dlc-filter",
  definition: "the dropdown of DLCs a set can come from",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "This filter builds its own scrollable menu instead of taking the shared menu.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Entries sort by name or by release date according to the saved setting.",
    },
  ],
} as const satisfies Module
