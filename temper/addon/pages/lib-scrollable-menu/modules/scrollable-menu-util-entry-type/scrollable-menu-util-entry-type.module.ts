import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuUtilEntryType = {
  id: "01a06275-c449-7779-ae6a-8ae87ffc8f8b",
  type: "page-type/module",
  slug: "scrollable-menu-util-entry-type",
  definition: "the resolution of an entry type from the entry flags, name and additional data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A divider is recognised from the entry name matching the divider string.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The resolved type is written back onto the entry along with each boolean flag.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An explicitly supplied entry type is returned untouched.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Entry values given as functions are stored in a callback subtable and re-run later.",
    },
  ],
} as const satisfies Module
