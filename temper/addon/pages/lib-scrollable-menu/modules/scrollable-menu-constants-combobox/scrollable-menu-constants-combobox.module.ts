import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuConstantsCombobox = {
  id: "01a06275-c446-7081-816d-48283e3f6bca",
  type: "page-type/module",
  slug: "scrollable-menu-constants-combobox",
  definition: "the mapping from a library option name to the ZO_ComboBox field or setter it drives",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "An option name absent from the mapping table is never applied.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The combobox default value for each field is declared alongside the mapping.",
    },
  ],
} as const satisfies Module
