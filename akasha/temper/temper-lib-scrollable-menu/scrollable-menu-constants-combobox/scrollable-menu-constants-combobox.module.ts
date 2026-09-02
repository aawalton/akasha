import type { Module } from "@akasha/code-system/module"

export const scrollableMenuConstantsCombobox = {
  id: "01a06275-c446-7081-816d-48283e3f6bca",
  pageTypeSlug: "module",
  slug: "scrollable-menu-constants-combobox",
  definition: "the mapping from a library option name to the ZO_ComboBox field or setter it drives",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every multi-selection option is funnelled through one shared update function.",
    },
    {
      invariantKind: "constraint",
      statement: "An option name absent from the mapping table is never applied.",
    },
    {
      invariantKind: "departure",
      statement: "The combobox default value for each field is declared alongside the mapping.",
    },
    {
      invariantKind: "departure",
      statement: "A negative maximum selection count is treated as no limit.",
    },
  ],
} as const satisfies Module
