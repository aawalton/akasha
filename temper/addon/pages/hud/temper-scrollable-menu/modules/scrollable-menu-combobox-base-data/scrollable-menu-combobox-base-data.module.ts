import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseData = {
  id: "01a06275-c444-7761-b0d7-1b6d8d9e1593",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-data",
  definition: "the normalisation of a raw entry table before it enters the combobox",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The original entry is shallow-copied into an _LSM subtable on first touch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Entry fields given as functions become callbacks re-evaluated on every refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Additional data keys are copied onto the entry only where the entry lacks those keys.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Header font and divider name are forced by a per-entry-type post-setup function.",
    },
  ],
} as const satisfies Module
