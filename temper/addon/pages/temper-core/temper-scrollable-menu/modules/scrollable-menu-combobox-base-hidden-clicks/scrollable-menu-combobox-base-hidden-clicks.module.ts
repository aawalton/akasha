import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuComboboxBaseHiddenClicks = {
  id: "01a06275-c445-7e98-a4c6-a02f0ce0cd3d",
  type: "page-type/module",
  slug: "scrollable-menu-combobox-base-hidden-clicks",
  definition: "the reading of which header or entry control a click at the context menu hit",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The five click flags are answered together as one multiple return.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A flag reading sits in its own module for length.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A flag is answered only while the context menu is shown.",
    },
  ],
} as const satisfies Module
