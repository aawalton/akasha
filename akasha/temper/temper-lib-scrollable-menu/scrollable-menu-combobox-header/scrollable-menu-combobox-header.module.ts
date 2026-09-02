import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxHeader = {
  id: "01a06275-c446-7e38-8795-527812c6d872",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-header",
  definition: "the collapsible header of a dropdown and its remembered collapsed state",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The collapsed state is saved per combobox name in the account-wide saved variables.",
    },
    {
      invariantKind: "departure",
      statement: "A supplied collapsed option overrides and suppresses the saved state.",
    },
    {
      invariantKind: "constraint",
      statement: "A combobox inside a scroll control is keyed by its parent's name instead.",
    },
    {
      invariantKind: "departure",
      statement: "Refreshing the header re-runs the width and height computation.",
    },
  ],
} as const satisfies Module
