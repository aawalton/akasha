import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseContextClickChecks = {
  id: "01a06275-c444-7eab-9372-905584db3ff8",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-context-click-checks",
  definition: "the two suppression checks around a click that lands outside the context menu",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The two checks are published on the library object rather than on a class.",
    },
    {
      invariantKind: "departure",
      statement: "A context menu click sets a preventer variable instead of returning a decision.",
    },
    {
      invariantKind: "departure",
      statement: "A checkbox or radio entry sets the suppression counter to two clicks.",
    },
    {
      invariantKind: "departure",
      statement: "Clicking away from the context menu clears the menu before the click is handled.",
    },
  ],
} as const satisfies Module
