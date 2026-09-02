import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseOverrides = {
  id: "01a06275-c445-7c41-ae93-4d1a321abb20",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-overrides",
  definition: "the base-class methods left empty or answering undefined",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "The base class leaves four methods with empty bodies.",
    },
    {
      invariantKind: "departure",
      statement: "The maximum row count answers undefined on the base class.",
    },
    {
      invariantKind: "departure",
      statement: "Width computation is fully implemented here rather than left to subclasses.",
    },
    {
      invariantKind: "constraint",
      statement: "A container width of zero falls back to the no-search-header minimum.",
    },
  ],
} as const satisfies Module
