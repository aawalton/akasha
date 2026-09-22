import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseIcons = {
  id: "01a06275-c445-7464-a21b-ee4eb4f0e7a3",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-icons",
  definition: "the population of a row's multi-icon control from the entry icon data",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A single icon value is wrapped into a one element list before processing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The new-entry icon is added ahead of any icon the entry declares.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Icon height is clamped between the label offset and the parent row height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Icon tooltips are concatenated into one string held on the multi-icon control.",
    },
  ],
} as const satisfies Module
