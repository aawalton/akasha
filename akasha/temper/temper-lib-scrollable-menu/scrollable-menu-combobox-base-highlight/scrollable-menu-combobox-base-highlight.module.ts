import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseHighlight = {
  id: "01a06275-c445-75f3-be93-84376c5556c2",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-highlight",
  definition: "the choice of highlight template and tint for one row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Highlight fields on the original entry data win over every computed default.",
    },
    {
      invariantKind: "departure",
      statement: "A submenu row that also carries a callback is given a distinct template.",
    },
    {
      invariantKind: "departure",
      statement: "A row that opens a context menu can take its own template under an option.",
    },
    {
      invariantKind: "constraint",
      statement: "A template is written onto the row data only where nothing is already set.",
    },
  ],
} as const satisfies Module
