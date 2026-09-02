import type { Module } from "@akasha/code-system/module"

export const scrollableMenuComboboxBaseIcons = {
  id: "01a06275-c445-7464-a21b-ee4eb4f0e7a3",
  pageTypeSlug: "module",
  slug: "scrollable-menu-combobox-base-icons",
  definition: "the population of a row's multi-icon control from the entry icon data",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A single icon value is wrapped into a one element list before processing.",
    },
    {
      invariantKind: "departure",
      statement: "The new-entry icon is added ahead of any icon the entry declares.",
    },
    {
      invariantKind: "constraint",
      statement: "Icon height is clamped between the label offset and the parent row height.",
    },
    {
      invariantKind: "departure",
      statement: "Icon tooltips are concatenated into one string held on the multi-icon control.",
    },
  ],
} as const satisfies Module
