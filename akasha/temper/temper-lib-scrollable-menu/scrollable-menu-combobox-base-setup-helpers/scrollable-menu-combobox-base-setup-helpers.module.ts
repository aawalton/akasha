import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseSetupHelpers = {
  id: "01a06275-c445-747a-a3e7-d3f0a1d5d282",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-setup-helpers",
  definition: "the per-part builders that attach an icon, arrow, divider, label or button to a row",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each named child control is found once and then cached on the row.",
    },
    {
      invariantKind: "departure",
      statement: "A radio or checkbox button joins a group keyed by entry type and group index.",
    },
    {
      invariantKind: "departure",
      statement: "A checkbox without a right-click callback is given the library default callback.",
    },
    {
      invariantKind: "constraint",
      statement: "A button group is created only where the entry declares a numeric group index.",
    },
  ],
} as const satisfies Module
