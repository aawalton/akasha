import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuEntryTypeDefaults = {
  id: "01a0c510-c8db-7c06-8a41-2a61913f5f1b",
  type: "page-type/module",
  slug: "scrollable-menu-entry-type-defaults",
  definition: "the default XML row template and highlight template for each entry type",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Each entry type names the setup function its row is filled by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A submenu, a checkbox, a button and a slider row pad their width by the height.",
    },
  ],
} as const satisfies Module
